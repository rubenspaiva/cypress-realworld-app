export class HomePage {
  elements = {
    appLogo: () => cy.get('[data-test="app-name-logo"]'),
    sidenavUserFullName: () => cy.get('[data-test="sidenav-user-full-name"]'),
    sidenavBankAccounts: () => cy.get('[data-test="sidenav-bankaccounts"]'),
    newTransactionButton: () => cy.get('[data-test="nav-top-new-transaction"]'),
    sidenavHomeButton: () => cy.get('[data-test="sidenav-home"]'),
    personalTab: () => cy.get('[data-test="nav-personal-tab"]'),
  };

  // Validar que o usuário está logado verificando a presença do logo e do nome
  validateUserLogged(firstName: string) {
    this.elements.appLogo().should("be.visible");
    this.elements.sidenavUserFullName().should("be.visible").and("contain", firstName);
  }

  // Navega para a página de Bank Accounts
  goToBankAccounts() {
    this.elements.sidenavBankAccounts().click();
  }

  // Aperta o botão para iniciar uma nova transação
  goToNewTransaction() {
    this.elements.newTransactionButton().click();
  }

  // Navega para o feed principal
  goToHomeFeed() {
    this.elements.sidenavHomeButton().click();
  }

  // Abre a tab no feed
  openFeedTab(tab: "personal") {
  cy.get(`[data-test="nav-${tab}-tab"]`).click();
}
}
