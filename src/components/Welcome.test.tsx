import React from "react";
import faker from "faker";
import { render } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome page", () => {
    it("renders sign in button, first name and email passed in", () => {
        const firstName = faker.name.firstName();
        const email = faker.internet.email();

        const { getByText, getByTestId } = render(<Welcome user={{ firstName, email }} />);

        expect(getByText("Sign In")).toBeInTheDocument();
        expect(getByTestId("firstname").textContent).toContain(firstName);
        expect(getByTestId("email").textContent).toEqual(email);
    });
});
