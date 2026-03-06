export class BankAccountsPage {
  elements = {
    newBankAccountButton: () => cy.get('[data-test="bankaccount-new"]'),
    bankNameInput: () => cy.get("#bankaccount-bankName-input"),
    routingNumberInput: () => cy.get("#bankaccount-routingNumber-input"),
    accountNumberInput: () => cy.get("#bankaccount-accountNumber-input"),
    submitButton: () => cy.get('[data-test="bankaccount-submit"]'),
  };

  clickNewBankAccount() {
    this.elements.newBankAccountButton().click();
  }

  fillBankAccountForm(bankName: string, routingNumber: string, accountNumber: string) {
    this.elements.bankNameInput().type(bankName);
    this.elements.routingNumberInput().type(routingNumber);
    this.elements.accountNumberInput().type(accountNumber);
  }

  submitBankAccount() {
    this.elements.submitButton().click();
  }

  createBankAccount(bankName: string, routingNumber: string, accountNumber: string) {
    this.clickNewBankAccount();
    this.fillBankAccountForm(bankName, routingNumber, accountNumber);
    this.submitBankAccount();
  }

  validateBankAccountVisible(bankName: string) {
    cy.contains(bankName).should("be.visible");
  }

  deleteBankAccount(bankName: string) {
    cy.contains("li", bankName).find('[data-test="bankaccount-delete"]').click();
  }

  validateBankAccountDeleted(bankName: string) {
    cy.contains("li", `${bankName} (Deleted)`).should("be.visible");
  }
}
