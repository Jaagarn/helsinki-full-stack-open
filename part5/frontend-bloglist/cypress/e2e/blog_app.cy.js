/* eslint-disable no-undef */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username: ");
    cy.contains("password: ");
    cy.contains("login");
    cy.get('[data-testid="login-username-input"]').should('exist');
    cy.get('[data-testid="login-password-input"]').should('exist');
    cy.get('[data-testid="login-login-button"]').should('exist');
  });
});
