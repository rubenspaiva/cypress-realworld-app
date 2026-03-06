import { LoginPage } from "../../pages/login.page";
import { HomePage } from "../../pages/home.page";

const loginPage = new LoginPage();
const homePage = new HomePage();

describe("Login - Usuário válido (Smoke)", () => {
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

  it("deve autenticar com credenciais válidas e acessar a aplicação", function () {
    cy.get("@user").then((user: any) => {
      // Realizar login
      loginPage.login(user.username);

      // Validar que o login foi bem-sucedido verificando elementos chave da home (logo e username)
      homePage.validateAppLogoVisible();
      homePage.validateLoggedUserName(user.firstName);
    });
  });
});
