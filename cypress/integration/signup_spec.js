describe("The Signup Form", () => {
    it("saves user inputs and reroutes them to welcome page", () => {
        cy.visit("/");

        cy.get("#firstname")
            .type("Eric")
            .should("have.value", "Eric");

        cy.get("#email")
            .type("eric@coolguy.com")
            .should("have.value", "eric@coolguy.com");

        cy.get("#password")
            .type("longishpassword")
            .should("have.value", "longishpassword");

        cy.get("#signup").click();

        cy.url().should("include", "welcome");

        cy.get("h2").contains("Eric");

        cy.get("strong").contains("eric@coolguy.com");
    });
    it("displays an error when invalid email address is entered", () => {
        cy.visit("/");

        cy.get("#firstname")
            .type("steve")
            .should("have.value", "steve");

        cy.get("#email")
            .type("ericcoolguy.com")
            .should("have.value", "ericcoolguy.com");

        cy.get("#password")
            .type("longishpassword")
            .should("have.value", "longishpassword");

        cy.get("#signup").click();

        cy.get("li").contains("Invalid email address");
    });
    it("displays an error when invalid password is entered", () => {
        cy.visit("/");

        cy.get("#firstname")
            .type("steve")
            .should("have.value", "steve");

        cy.get("#email")
            .type("eric@coolguy.com")
            .should("have.value", "eric@coolguy.com");

        cy.get("#password")
            .type("short")
            .should("have.value", "short");

        cy.get("#signup").click();

        cy.get("li").contains("Password must be longer than 8 characters");
    });
});
