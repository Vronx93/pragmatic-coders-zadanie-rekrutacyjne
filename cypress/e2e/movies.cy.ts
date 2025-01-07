describe("movies page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/movies");
  });

  it("should start with 2 movies list", () => {
    cy.get('[data-cy="movie"]').should("have.length", 2);
  });

  it("should add movie to favourites by clicking on Accept button", () => {
    cy.contains("Accept").click();
    cy.contains("Added to favourites");
    cy.contains("Favourites").click();
    cy.get('[data-cy="favourite-movie"]').should("have.length", 1);
  });

  it("should reject movie by clicking Reject button", () => {
    cy.contains("Reject").click();
    cy.contains("Disliked");
  });

  it("should reject movie by clicking arrow right", () => {
    cy.get('[data-cy="next-movie-btn"]').click();
    cy.contains("Disliked");
  });
});
