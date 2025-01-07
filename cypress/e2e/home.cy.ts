describe("navigate from homepage to movies", () => {
  it("should be able to go from homepage to movies", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Explore movies").click();
    cy.url().should("include", "/movies");
  });
});
