# OrangeHRM - Login Feature Automation Testing (Cypress)

End-to-end (E2E) automation testing untuk fitur **Login** pada aplikasi [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login), menggunakan Cypress dengan pola **Page Object Model (POM)**.

## Tech Stack

- [Cypress](https://www.cypress.io/) - E2E testing framework
- JavaScript
- Page Object Model (POM)
- JSON Fixtures

## Struktur Folder

```
cypress/
├── e2e/
│   └── login/
│       └── login.cy.js        # Test spec - 12 test case fitur Login
├── fixtures/
│   └── loginData.json         # Data test (username, password, dll)
└── support/
    └── pages/
        └── loginPage.js        # Page Object - selector & method halaman Login
cypress.config.js
package.json
```

## Cakupan Test Case

Automation ini mencakup 12 test case dari total 19 skenario yang terdokumentasi di test case design (spreadsheet), dengan kombinasi skenario **Positive** dan **Negative**:

| No  | Test Case ID | Skenario                                        | Kategori |
| --- | ------------ | ----------------------------------------------- | -------- |
| 1   | TS-LGN-001   | Menampilkan halaman Login dengan elemen lengkap | Positive |
| 2   | TS-LGN-002   | Menampilkan field Username                      | Positive |
| 3   | TS-LGN-003   | Menampilkan field Password                      | Positive |
| 4   | TS-LGN-004   | Menampilkan link Forgot Password                | Positive |
| 5   | TS-LGN-005   | Login berhasil dengan username & password valid | Positive |
| 6   | TS-LGN-006   | Login gagal - password salah                    | Negative |
| 7   | TS-LGN-007   | Login gagal - username salah                    | Negative |
| 8   | TS-LGN-008   | Login gagal - username dikosongkan              | Negative |
| 9   | TS-LGN-009   | Login gagal - password dikosongkan              | Negative |
| 10  | TS-LGN-010   | Login gagal - username & password dikosongkan   | Negative |
| 11  | TS-LGN-011   | Login berhasil menggunakan tombol Enter         | Positive |
| 12  | TS-LGN-012   | Berhasil mengakses halaman Forgot Password      | Positive |

## Hasil Test

Status: **12/12 test case Passed** ✅

## Author

Moch. Anang Ardiansyah
