export class TransactionsPage {
  elements = {
    userSearchInput: () => cy.get('[data-test="user-list-search-input"]'),
    amountInput: () => cy.get('[data-test="transaction-create-amount-input"]'),
    descriptionInput: () => cy.get('[data-test="transaction-create-description-input"]'),
    submitPaymentButton: () => cy.get('[data-test="transaction-create-submit-payment"]'),
  };

  searchAndSelectUser(username: string) {
    this.elements.userSearchInput().type(username);
    cy.contains(username).click();
  }

  fillPayment(amount: string, note: string) {
    this.elements.amountInput().type(amount);
    this.elements.descriptionInput().type(note);
  }

  submitPayment() {
    this.elements.submitPaymentButton().click();
  }

  validateCreatedTransaction(amount: string, note: string) {
    cy.contains(`Paid $${amount}.00 for ${note}`).should("be.visible");
  }

  validateTransactionInFeed(note: string) {
    cy.contains(note, { timeout: 10000 }).should("be.visible");
  }
}
