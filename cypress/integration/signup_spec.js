import faker from "faker";

describe("The Signup Form", () => {
    it("saves user inputs and reroutes them to welcome page", () => {
        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        cy.visit("/");

        cy.get("#firstname")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("#email")
            .type(email)
            .should("have.value", email);

        cy.get("#password")
            .type(password)
            .should("have.value", password);

        cy.get("#signup").click();

        cy.url().should("include", "welcome");

        cy.get("h2").contains(firstName);

        cy.get("strong").contains(email);
    });
    it("displays an error when invalid email address is entered", () => {
        const firstName = faker.name.firstName();
        const password = faker.internet.password();

        cy.visit("/");

        cy.get("#firstname")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("#email")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("#password")
            .type(password)
            .should("have.value", password);

        cy.get("#signup").click();

        cy.get("li").contains("Invalid email address");
    });
    it("displays an error when invalid password is entered", () => {
        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        cy.visit("/");

        cy.get("#firstname")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("#email")
            .type(email)
            .should("have.value", email);

        cy.get("#password")
            .type("short")
            .should("have.value", "short");

        cy.get("#signup").click();

        cy.get("li").contains("Password must be longer than 8 characters");
    });
});
