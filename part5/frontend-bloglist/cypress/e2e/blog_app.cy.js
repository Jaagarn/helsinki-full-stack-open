/* eslint-disable no-undef */
const user = {
  name: "Matti Luukkainen",
  username: "mluukkai",
  password: "salainen",
};

const blog = {
  title: "Blog 1 test title",
  author: "Blog 1 test author",
  url: "www.blog1testsite.xyz",
  likes: 1,
  user: {
    username: "root",
    name: "name test",
    id: "verylongidstring2321321",
  },
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username: ");
    cy.contains("password: ");
    cy.contains("login");
    cy.get('[data-testid="login-username-input"]').should("exist");
    cy.get('[data-testid="login-password-input"]').should("exist");
    cy.get('[data-testid="login-login-button"]').should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get('[data-testid="login-username-input"]').type(user.username);
      cy.get('[data-testid="login-password-input"]').type(user.password);
      cy.get('[data-testid="login-login-button"]').click();
      cy.get('[data-testid="blogs-home-page"]').should("exist");
    });

    it("fails with wrong credentials", function () {
      cy.get('[data-testid="login-username-input"]').type("wrongUsername");
      cy.get('[data-testid="login-password-input"]').type("wrongPassword");
      cy.get('[data-testid="login-login-button"]').click();
      cy.get('[data-testid="blogs-home-page"]').should("not.exist");
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('[data-testid="login-username-input"]').type(user.username);
      cy.get('[data-testid="login-password-input"]').type(user.password);
      cy.get('[data-testid="login-login-button"]').click();
    })

    it('A blog can be created', function() {
      cy.get('[data-testid="toggable-show-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(blog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(blog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(blog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.wait(100)
      cy.contains(`title: ${blog.title}, author: ${blog.author}`)
    })
  })
});
