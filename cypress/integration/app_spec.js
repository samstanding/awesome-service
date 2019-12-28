/// <reference types="Cypress" />

import faker from "faker";

describe("The Signup Form", () => {
    it("saves user inputs and reroutes them to welcome page", () => {
        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        cy.visit("/");

        cy.get("[data-testid=firstname] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=email] > input")
            .type(email)
            .should("have.value", email);

        cy.get("[data-testid=password] > input")
            .type(password)
            .should("have.value", password);

        cy.get("[data-testid=submit]").click();

        cy.url().should("include", "welcome");

        cy.get("h2").contains(firstName);

        cy.get("strong").contains(email);
    });
    it("displays an error when invalid email address is entered", () => {
        const firstName = faker.name.firstName();
        const password = faker.internet.password();

        cy.visit("/");

        cy.get("[data-testid=firstname] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=email] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=password] > input")
            .type(password)
            .should("have.value", password);

        cy.get("[data-testid=submit]").click();

        cy.get("li").contains("Invalid email address");
    });
    it("displays an error when invalid password is entered", () => {
        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        cy.visit("/");

        cy.get("[data-testid=firstname] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=email] > input")
            .type(email)
            .should("have.value", email);

        cy.get("[data-testid=password] > input")
            .type("short")
            .should("have.value", "short");

        cy.get("[data-testid=submit]").click();

        cy.get("li").contains("Password must be longer than 8 characters");
    });
    it("reroutes you to signup if you haven't signed up", () => {
        cy.visit("/welcome");

        cy.url().should("include", "signup");
    });
});
