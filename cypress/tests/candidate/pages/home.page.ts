export class HomePage {
  elements = {
    sidenavBankAccounts: () => cy.get('[data-test="sidenav-bankaccounts"]'),
  };

  // Navega para a página de Bank Accounts
  goToBankAccounts() {
    this.elements.sidenavBankAccounts().click();
  }
}