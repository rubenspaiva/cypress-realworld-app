Cypress.Commands.add("getRandomUser", () => {
  return cy.fixture("users").then((data) => {
    const user = Cypress._.sample(data.users);
    return user;
  });
});

export {};
