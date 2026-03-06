import { HomePage } from "../pages/home.page";
import { BankAccountsPage } from "../pages/bankAccounts.page";
import { createBankAccountData } from "../factories/bankAccount.factory";

const homePage = new HomePage();
const bankAccountsPage = new BankAccountsPage();

describe("Bank Account - criar e deletar", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.task("db:seed");
    cy.getRandomUser().as("user");
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("deve criar e deletar uma conta bancária", () => {
    cy.get("@user").then((user: any) => {
      cy.login(user.username);

      //Criar dados da conta bancária
      const { bankName, routingNumber, accountNumber } = createBankAccountData();

      // Ir para tela de Bank Accounts
      homePage.goToBankAccounts();

      // Criar Bank Account
      bankAccountsPage.createBankAccount(bankName, routingNumber, accountNumber);

      // Validar que a conta apareceu na lista
      bankAccountsPage.validateBankAccountVisible(bankName);

      // Deletar a conta recém criada
      bankAccountsPage.deleteBankAccount(bankName);

      // Validar que a conta foi deletada
      bankAccountsPage.validateBankAccountDeleted(bankName);
    });
  });
});
