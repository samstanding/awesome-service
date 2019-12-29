/// <reference types="Cypress" />

import faker from "faker";

describe("The Signup Form", () => {
    it("saves valid form data and reroutes them to welcome page", () => {
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

        cy.contains("Saving Signup Data");

        cy.url().should("include", "welcome");

        cy.get("h2").contains(firstName);

        cy.get("strong").contains(email);
    });
    it("displays appropriate errors when invalid form data is entered and still reroutes to welcome page when valid data is entered", () => {
        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        cy.visit("/");

        cy.get("[data-testid=firstname] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=email] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=password] > input")
            .type(firstName)
            .should("have.value", firstName);

        cy.get("[data-testid=submit]").click();

        cy.get("li").contains("Invalid email address");
        cy.get("li").contains("Password cannot be the same as your email or first name");

        cy.get("[data-testid=email] > input")
            .clear()
            .type(email)
            .should("have.value", email);

        cy.get("[data-testid=password] > input")
            .clear()
            .type(email)
            .should("have.value", email);

        cy.get("[data-testid=submit]").click();

        cy.get("li").contains("Password cannot be the same as your email or first name");

        cy.get("[data-testid=password] > input")
            .clear()
            .type("short")
            .should("have.value", "short");

        cy.get("[data-testid=submit]").click();

        cy.get("li").contains("Password must be longer than 8 characters");

        cy.get("[data-testid=password] > input")
            .clear()
            .type(password)
            .should("have.value", password);

        cy.get("[data-testid=submit]").click();

        cy.contains("Saving Signup Data");

        cy.url().should("include", "welcome");

        cy.get("h2").contains(firstName);

        cy.get("strong").contains(email);
    });
    it("reroutes you to signup if you haven't signed up", () => {
        cy.visit("/welcome");

        cy.url().should("include", "signup");
        cy.url().should("not.include", "welcome");
    });
});
