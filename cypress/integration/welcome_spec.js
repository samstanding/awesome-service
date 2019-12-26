describe("The Welcome Page", () => {
    it("reroutes you to signup if you haven't signed up", () => {
        cy.visit('/welcome');

        cy.url().should("include", "signup");
    })
})