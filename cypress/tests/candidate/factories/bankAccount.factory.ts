export const createBankAccountData = () => {
  return {
    bankName: `Bank ${Date.now()}`,
    routingNumber: Cypress._.random(100000000, 999999999).toString(),
    accountNumber: Cypress._.random(100000000, 999999999).toString(),
  };
};