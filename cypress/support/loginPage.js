// TUGAS POM

import loginData from "../fixtures/loginData.json";

class loginPage {
  // Navigasi
  visitUrl() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }
  loginUrlValidation() {
    cy.url().should("include", "/auth/login");
  }
  dashboardUrlValidation() {
    cy.url().should("include", "/dashboard/index");
  }
  forgotPassUrlValidation() {
    cy.url().should("include", "/auth/requestPasswordResetCode");
  }

  // Username
  inputUsername(username) {
    cy.get('[name="username"]').type(username);
  }
  usernameFieldVisible() {
    cy.get('[name="username"]').should("be.visible");
  }

  // Password
  inputPassword(password) {
    cy.get('[name="password"]').type(password);
  }
  passwordFieldVisible() {
    cy.get('[name="password"]').should("be.visible");
  }
  passwordFieldValidation() {
    cy.get('[name="password"]').should("have.attr", "type", "password");
  }

  // Buttons
  clickLoginBtn() {
    cy.get('button[type="submit"]').click();
  }
  clickForgotPassword() {
    cy.contains("Forgot your password?").click();
  }
  clickResetPasswordBtn() {
    cy.contains("button", "Reset Password").click();
  }
  clickCancelResetPasswordBtn() {
    cy.contains("button", "Cancel").click();
  }
  resetPasswordBtnVisible() {
    cy.contains("button", "Cancel").should("be.visible");
    cy.contains("button", "Reset Password").should("be.visible");
  }

  // Validation / Alert
  loginAlertValidation(message) {
    cy.get(".oxd-alert-content-text").should("contain", message);
  }
  requiredFieldValidation(message) {
    cy.get(".oxd-input-field-error-message").should("contain", message);
  }
  bothAlert() {
    cy.get(".oxd-input-field-error-message").should("have.length", 2);
    cy.get(".oxd-input-field-error-message").each(($el) => {
      cy.wrap($el).should("contain", "Required");
    });
  }
  userDropdownNameVisible() {
    cy.get(".oxd-userdropdown-name").should("be.visible");
  }

  // Login Action
  login() {
    this.visitUrl();
    this.inputUsername(loginData.validUsername);
    this.inputPassword(loginData.validPassword);
    this.clickLoginBtn();
    this.dashboardUrlValidation();
  }

  // Intercept
  interceptTimeAtWork() {
    cy.intercept("GET", "**/dashboard/employees/time-at-work**").as(
      "workingTime",
    );
  }
  interceptActionSummary() {
    cy.intercept("GET", "**/dashboard/employees/action-summary").as(
      "actionSummary",
    );
  }
  interceptShortcuts() {
    cy.intercept("GET", "**/dashboard/shortcuts").as("shortcuts");
  }
  interceptFeed() {
    cy.intercept("GET", "**/buzz/feed**").as("feed");
  }
  interceptLoginPageDocument() {
    cy.intercept({
      url: "**/auth/login",
      resourceType: "document",
    }).as("loginPageDoc");
  }
  interceptSubunit() {
    cy.intercept("GET", "**/dashboard/employees/subunit").as("subunit");
  }
  interceptLocations() {
    cy.intercept("GET", "**/dashboard/employees/locations").as("locations");
  }
  interceptLeaves() {
    cy.intercept("GET", "**/dashboard/employees/leaves**").as("leaves");
  }

  // Intercept Wait Method
  waitWorkingTime() {
    cy.wait("@workingTime").its("response.statusCode").should("eq", 200);
  }
  verifyActionSummaryNotCalled() {
    cy.get("@actionSummary.all").should("have.length", 0);
  }
  verifyShortcutsNotCalled() {
    cy.get("@shortcuts.all").should("have.length", 0);
  }
  verifyFeedNotCalled() {
    cy.get("@feed.all").should("have.length", 0);
  }
  waitLoginPageDocument() {
    cy.wait("@loginPageDoc").its("response.statusCode").should("eq", 200);
  }
  verifySubunitNotCalled() {
    cy.get("@subunit.all").should("have.length", 0);
  }
  waitLocations() {
    cy.wait("@locations").its("response.statusCode").should("eq", 200);
  }
  waitLeaves() {
    cy.wait("@leaves").its("response.statusCode").should("eq", 200);
  }
}

export default new loginPage();
