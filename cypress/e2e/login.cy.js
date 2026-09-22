import loginPage from "../support/loginPage";
import loginData from "../fixtures/loginData.json";

describe("OrangeHRM - Fitur Login", () => {
  beforeEach(() => {
    loginPage.visitUrl();
  });

  // TS-LGN-001
  it("TS-LGN-001 - Menampilkan halaman Login dengan elemen lengkap", () => {
    loginPage.usernameFieldVisible();
    loginPage.passwordFieldVisible();
    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("contain.text", "Login");
  });

  // TS-LGN-002
  it("TS-LGN-002 - Menampilkan field Username", () => {
    loginPage.usernameFieldVisible();
  });

  // TS-LGN-003
  it("TS-LGN-003 - Menampilkan field Password", () => {
    loginPage.passwordFieldVisible();
    loginPage.passwordFieldValidation();
  });

  // TS-LGN-004
  it("TS-LGN-004 - Menampilkan link Forgot Password", () => {
    cy.contains("Forgot your password?").should("be.visible");
  });

  // TS-LGN-005
  it("TS-LGN-005 - Login berhasil dengan username dan password valid", () => {
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickLoginBtn();
    loginPage.dashboardUrlValidation();
    loginPage.userDropdownNameVisible();
  });

  // TS-LGN-006
  it("TS-LGN-006 - Login gagal dengan password salah", () => {
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.wrongPassword);
    loginPage.clickLoginBtn();
    loginPage.loginAlertValidation("Invalid credentials");
    loginPage.loginUrlValidation();
  });

  // TS-LGN-007
  it("TS-LGN-007 - Login gagal dengan username salah", () => {
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickLoginBtn();
    loginPage.loginAlertValidation("Invalid credentials");
    loginPage.loginUrlValidation();
  });

  // TS-LGN-008
  it("TS-LGN-008 - Login gagal saat username dikosongkan", () => {
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickLoginBtn();
    loginPage.requiredFieldValidation("Required");
  });

  // TS-LGN-009
  it("TS-LGN-009 - Login gagal saat password dikosongkan", () => {
    loginPage.inputUsername(loginData.validUsername);
    loginPage.clickLoginBtn();
    loginPage.requiredFieldValidation("Required");
  });

  // TS-LGN-010
  it("TS-LGN-010 - Login gagal saat username dan password dikosongkan", () => {
    loginPage.clickLoginBtn();
    loginPage.bothAlert();
  });

  // TS-LGN-011
  it("TS-LGN-011 - Login berhasil menggunakan tombol Enter", () => {
    loginPage.inputUsername(loginData.validUsername);
    cy.get('[name="password"]').type(`${loginData.validPassword}{enter}`);
    loginPage.dashboardUrlValidation();
  });

  // TS-LGN-012
  it("TS-LGN-012 - Berhasil mengakses halaman Forgot Password", () => {
    loginPage.clickForgotPassword();
    loginPage.forgotPassUrlValidation();
    loginPage.resetPasswordBtnVisible();
  });
});
