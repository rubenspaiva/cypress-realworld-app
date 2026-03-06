import { HomePage } from "../pages/home.page";
import { TransactionsPage } from "../pages/transactions.page";
import { createTransactionData } from "../factories/transaction.factory";

const homePage = new HomePage();
const transactionsPage = new TransactionsPage();

describe("Transactions - enviar pagamento e validar no feed", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.task("db:seed");
    cy.getRandomUser().as("sender");
  });

  it("deve enviar pagamento e validar no feed", () => {
    cy.get("@sender").then((sender: any) => {
      cy.login(sender.username);

      // Criar dados da transação
      const { amount, note } = createTransactionData();

      cy.intercept("POST", "**/transactions").as("createTransaction");

      // Iniciar nova transação
      homePage.goToNewTransaction();

      // Escolher usuário destino aleatório (diferente do sender)
      cy.fixture("users").then((data) => {
        const users = data.users;
        const receiver = Cypress._.sample(users.filter((u: any) => u.username !== sender.username));

        // Buscar e selecionar usuário destino 
        transactionsPage.searchUser(receiver.username);
        transactionsPage.selectUser(receiver.username);

        // Preencher e enviar pagamento
        transactionsPage.fillPayment(amount, note);
        transactionsPage.submitPayment();

        // Validar criação (assert forte)
        cy.wait("@createTransaction").its("response.statusCode").should("be.oneOf", [200, 201]);

        // Validar detalhes da transação criada
        transactionsPage.validateCreatedTransaction(amount, note);

        // Voltar para feed e validar
        homePage.goToHomeFeed();
        homePage.openPersonalTab();
        transactionsPage.validateTransactionInFeed(note);
      });
    });
  });
});
