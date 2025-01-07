describe("favourites page after adding one movie to favourites", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/movies");
    cy.contains("Accept").click();
    cy.contains("Favourites").click();
  });

  it("should have one favourite movie", () => {
    cy.get('[data-cy="favourite-movie"]').should("have.length", 1);
  });

  it("should remove movie by clicking Remove button", () => {
    cy.contains("Remove").click();
    cy.contains("Removed from favourites");
    cy.get('[data-cy="favourite-movie"]').should("not.exist");
  });
});
