describe("Products API - Fake Store API", () => {
  const baseUrl = "https://fakestoreapi.com";

  it("1. GET /products - berhasil mengambil semua produk", () => {
    cy.request("GET", `${baseUrl}/products`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body[0]).to.have.property("title");
    });
  });

  it("2. GET /products/:id - berhasil mengambil produk dengan id valid", () => {
    cy.request("GET", `${baseUrl}/products/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(1);
    });
  });

  it("3. GET /products/:id - id tidak ditemukan, response kosong", () => {
    cy.request("GET", `${baseUrl}/products/9999`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.empty;
    });
  });

  it("4. POST /products - berhasil menambah produk baru", () => {
    const payload = {
      title: "Produk Testing Cypress",
      price: 50000,
      description: "Produk hasil automation testing",
      image: "https://i.pravatar.cc",
      category: "electronic",
    };

    cy.request("POST", `${baseUrl}/products`, payload).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.title).to.eq(payload.title);
    });
  });

  it("5. POST /products - kirim body tanpa field title, tetap diterima (tidak ada validasi)", () => {
    const payload = {
      price: 50000,
      category: "electronic",
    };

    cy.request("POST", `${baseUrl}/products`, payload).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.title).to.be.undefined;
    });
  });

  it("6. PUT /products/:id - berhasil update produk dengan id valid", () => {
    const payload = {
      title: "Produk Sudah Diupdate",
      price: 75000,
      description: "Update via PUT",
      image: "https://i.pravatar.cc",
      category: "electronic",
    };

    cy.request("PUT", `${baseUrl}/products/7`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq(payload.title);
    });
  });

  it("7. PUT /products/:id - update id yang tidak ada, tetap diterima", () => {
    const payload = { title: "Update Id Gak Ada" };

    cy.request("PUT", `${baseUrl}/products/9999`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq(payload.title);
    });
  });

  it("8. PATCH /products/:id - berhasil update sebagian data produk", () => {
    const payload = { price: 99000 };

    cy.request("PATCH", `${baseUrl}/products/8`, payload).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.price).to.eq(payload.price);
    });
  });

  it("9. GET /products/category/:name - berhasil mengambil produk dari kategori valid", () => {
    cy.request("GET", `${baseUrl}/products/category/electronics`).then(
      (res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an("array");
      },
    );
  });

  it("10. GET /products/category/:name - kategori tidak ada, hasil array kosong", () => {
    cy.request("GET", `${baseUrl}/products/category/kategori-ngasal`).then(
      (res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.length(0);
      },
    );
  });

  it("11. DELETE /products/:id - berhasil menghapus produk dengan id valid", () => {
    cy.request("DELETE", `${baseUrl}/products/8`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(8);
    });
  });

  it("12. DELETE /products/:id - hapus id yang tidak ada, tetap response 200", () => {
    cy.request("DELETE", `${baseUrl}/products/9999`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
