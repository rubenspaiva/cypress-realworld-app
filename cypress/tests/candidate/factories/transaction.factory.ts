export const createTransactionData = () => {
  return {
    amount: Cypress._.random(10, 50).toString(),
    note: `Payment ${Date.now()}`,
  };
};
