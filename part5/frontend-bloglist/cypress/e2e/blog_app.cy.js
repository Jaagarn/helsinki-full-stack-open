/* eslint-disable no-undef */
const baseUser = {
  name: "Matti Luukkainen",
  username: "mluukkai",
  password: "salainen",
};

const secondaryUser = {
  name: "Tove Jansson",
  username: "moom1nmamma",
  password: "10v3tuulikki",
};

const baseBlog = {
  title: "Blog 1 test title",
  author: "Blog 1 test author",
  url: "www.blog1testsite.xyz",
};

const secondaryBlog = {
  title: "Blog 2 test title",
  author: "Blog 2 test author",
  url: "www.blog2testsite.xyz",
};

const tertiaryBlog = {
  title: "Blog 3 test title",
  author: "Blog 3 test author",
  url: "www.blog3testsite.xyz",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", baseUser);
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
      cy.get('[data-testid="login-username-input"]').type(baseUser.username);
      cy.get('[data-testid="login-password-input"]').type(baseUser.password);
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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get('[data-testid="login-username-input"]').type(baseUser.username);
      cy.get('[data-testid="login-password-input"]').type(baseUser.password);
      cy.get('[data-testid="login-login-button"]').click();
    });

    it("A blog can be created", function () {
      cy.get('[data-testid="toggable-show-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(baseBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(baseBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(baseBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.wait(100);
      cy.contains(`title: ${baseBlog.title}, author: ${baseBlog.author}`);
    });

    it("A blog can be liked", function () {
      cy.get('[data-testid="toggable-show-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(baseBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(baseBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(baseBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.wait(100);
      cy.contains(`title: ${baseBlog.title}, author: ${baseBlog.author}`);

      cy.get('[data-testid="blog-view-button"]').click();
      cy.wait(100);
      cy.contains(`likes: 0`);
      cy.get('[data-testid="blog-like-button"]').click();
      cy.wait(100);
      cy.contains(`likes: 1`);
    });

    it("A blog can be deleted by the user who created it", function () {
      cy.get('[data-testid="toggable-show-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(baseBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(baseBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(baseBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.wait(100);
      cy.contains(`title: ${baseBlog.title}, author: ${baseBlog.author}`);

      cy.get('[data-testid="blog-view-button"]').click();
      cy.get('[data-testid="blog-remove-button"]').click();
      cy.wait(100);
      cy.contains(
        `title: ${baseBlog.title}, author: ${baseBlog.author}`
      ).should("not.exist");
    });

    it("A blog can't be deleted by a user that did not create it", function () {
      cy.get('[data-testid="toggable-show-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(baseBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(baseBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(baseBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.wait(100);
      cy.contains(`title: ${baseBlog.title}, author: ${baseBlog.author}`);
      cy.get('[data-testid="blogs-home-logout-button"]').click();

      cy.request("POST", "http://localhost:3003/api/users/", secondaryUser);

      cy.get('[data-testid="login-username-input"]').type(secondaryUser.username);
      cy.get('[data-testid="login-password-input"]').type(secondaryUser.password);
      cy.get('[data-testid="login-login-button"]').click();

      cy.contains(
        `title: ${baseBlog.title}, author: ${baseBlog.author}`
      );
      cy.get('[data-testid="blog-view-button"]').click();
      cy.get('[data-testid="blog-remove-button"]').should("not.exist");
    });

    it("Blogs are sorted according to likes", function () {
      cy.get('[data-testid="toggable-show-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(baseBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(baseBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(baseBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(secondaryBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(secondaryBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(secondaryBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      cy.get('[data-testid="create-blog-title-input"]').type(tertiaryBlog.title);
      cy.get('[data-testid="create-blog-author-input"]').type(tertiaryBlog.author);
      cy.get('[data-testid="create-blog-url-input"]').type(tertiaryBlog.url);
      cy.get('[data-testid="create-blog-submit-button"]').click();
      
      cy.get('[data-testid="blog-view-button"]').eq(2).click();
      cy.get('[data-testid="blog-like-button"]').click();
      cy.wait(100);
      cy.get('[data-testid="blog-like-button"]').click();
      cy.wait(100);
      cy.get('[data-testid="blog-hide-button"]').click();

      cy.get('[data-testid="blog-view-button"]').eq(2).click();
      cy.get('[data-testid="blog-like-button"]').click();
      cy.wait(100);
      cy.get('[data-testid="blog-hide-button"]').click();

      cy.get('[data-testid="blog-title-collapsed"]').eq(0).should('contain', `title: ${tertiaryBlog.title}, author: ${tertiaryBlog.author}`);
      cy.get('[data-testid="blog-title-collapsed"]').eq(1).should('contain', `title: ${secondaryBlog.title}, author: ${secondaryBlog.author}`);
      cy.get('[data-testid="blog-title-collapsed"]').eq(2).should('contain', `title: ${baseBlog.title}, author: ${baseBlog.author}`);

    });
  });
});
