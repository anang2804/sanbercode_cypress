import loginPage from "../support/loginPage";
import loginData from "../fixtures/loginData.json";

describe("OrangeHRM - Fitur Login (dengan Intercept)", () => {
  beforeEach(() => {
    loginPage.visitUrl();
  });

  // TS-LGN-001
  it("TS-LGN-001 - Menampilkan halaman Login dengan elemen lengkap", () => {
    loginPage.interceptLoginPageDocument();
    loginPage.visitUrl();
    loginPage.waitLoginPageDocument();

    loginPage.usernameFieldVisible();
    loginPage.passwordFieldVisible();
    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("contain.text", "Login");
  });

  // TS-LGN-005 | Intercept: dashboard/employees/time-at-work
  it("TS-LGN-005 - Login berhasil dengan username dan password valid", () => {
    loginPage.interceptTimeAtWork();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickLoginBtn();

    loginPage.dashboardUrlValidation();
    loginPage.userDropdownNameVisible();
    loginPage.waitWorkingTime();
  });

  // TS-LGN-006
  it("TS-LGN-006 - Login gagal dengan password salah", () => {
    loginPage.interceptActionSummary();

    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.wrongPassword);
    loginPage.clickLoginBtn();

    loginPage.loginAlertValidation("Invalid credentials");
    loginPage.loginUrlValidation();
    loginPage.verifyActionSummaryNotCalled();
  });

  // TS-LGN-007
  it("TS-LGN-007 - Login gagal dengan username salah", () => {
    loginPage.interceptShortcuts();

    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickLoginBtn();

    loginPage.loginAlertValidation("Invalid credentials");
    loginPage.loginUrlValidation();
    loginPage.verifyShortcutsNotCalled();
  });

  // TS-LGN-009
  it("TS-LGN-009 - Login gagal saat username dikosongkan", () => {
    loginPage.interceptFeed();

    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickLoginBtn();

    loginPage.requiredFieldValidation("Required");
    loginPage.verifyFeedNotCalled();
  });

  // TS-LGN-010
  it("TS-LGN-010 - Login gagal saat password dikosongkan", () => {
    loginPage.interceptSubunit();

    loginPage.inputUsername(loginData.validUsername);
    loginPage.clickLoginBtn();

    loginPage.requiredFieldValidation("Required");
    loginPage.verifySubunitNotCalled();
  });

  // TS-LGN-011
  it("TS-LGN-011 - Login gagal saat username dan password dikosongkan", () => {
    loginPage.interceptLeaves();

    loginPage.clickLoginBtn();

    loginPage.bothAlert();
    cy.get("@leaves.all").should("have.length", 0);
  });

  // TS-LGN-012
  it("TS-LGN-012 - Login berhasil menggunakan tombol Enter", () => {
    loginPage.interceptLocations();

    loginPage.inputUsername(loginData.validUsername);
    cy.get('[name="password"]').type(`${loginData.validPassword}{enter}`);

    loginPage.dashboardUrlValidation();
    loginPage.waitLocations();
  });
});
