export class LoginPage {
  elements = {
    usernameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    submitButton: () => cy.get('[data-test="signin-submit"]'),
  };

  visit() {
    cy.visit("/signin");
  }

  fillUsername(username: string) {
    this.elements.usernameInput().should("be.visible").clear().type(username);
  }

  fillPassword(password: string) {
    this.elements.passwordInput().should("be.visible").clear().type(password, {
      log: false,
    });
  }

  submit() {
    this.elements.submitButton().should("be.enabled").click();
  }

   login(username: string) {
    const password = Cypress.env("defaultPassword");

    if (!password) {
      throw new Error("Senha não definida. Configure SEED_DEFAULT_USER_PASSWORD.");
    }

    this.visit();
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();

    // Validação simples de login
    cy.location("pathname", { timeout: 10000 }).should("not.include", "signin");
  }
}