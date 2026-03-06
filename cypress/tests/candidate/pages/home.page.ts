export class HomePage {
  elements = {
    sidenavBankAccounts: () => cy.get('[data-test="sidenav-bankaccounts"]'),
    newTransactionButton: () => cy.get('[data-test="nav-top-new-transaction"]'),
    sidenavHomeButton: () => cy.get('[data-test="sidenav-home"]'),
    personalTab: () => cy.get('[data-test="nav-personal-tab"]'),
  };

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

  // Abre a tab pessoal do feed
  openPersonalTab() {
    this.elements.personalTab().click();
  }
}
