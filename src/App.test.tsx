import React from "react";
import { renderWithMemoryRouter } from "./test-utils";
import { fireEvent } from "@testing-library/dom";
import faker from "faker";
import App from "./App";

jest.useFakeTimers();

describe("The App", () => {
    it("renders a form with inputs for first name, email, password and confirm password", () => {
        const { getByLabelText } = renderWithMemoryRouter(<App />);

        expect(getByLabelText("First Name")).toBeInTheDocument();
        expect(getByLabelText("Email Address")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
        expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    });
    it("takes in valid form data, and routes user to welcome page where it displays first name and email", () => {
        const { getByLabelText, getByTestId } = renderWithMemoryRouter(<App />);

        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: firstName } });
        fireEvent.change(emailNode, { target: { value: email } });
        fireEvent.change(passwordNode, { target: { value: password } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        fireEvent.submit(getByTestId(/form/i));

        jest.runAllTimers();

        expect(window.location.href).toContain("welcome");
        expect(getByTestId("firstname").textContent).toContain(firstName);
        expect(getByTestId("email").textContent).toEqual(email);
    });
    it("throws errors when bad data is entered and accepts valid form data", () => {
        const { getByLabelText, getByTestId, getByText, queryByText, debug } = renderWithMemoryRouter(<App />);

        const firstName = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: firstName } });
        fireEvent.change(emailNode, { target: { value: firstName } });
        fireEvent.change(passwordNode, { target: { value: firstName } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        expect(queryByText("Invalid email address")).toBeNull();
        expect(queryByText("Password cannot be the same as your email")).toBeNull();
        expect(queryByText("Password must be longer than 8 characters")).toBeNull();
        expect(queryByText("Passwords must match")).toBeNull();

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password cannot be the same as your email or first name")).toBeInTheDocument();
        expect(getByText("Invalid email address")).toBeInTheDocument();
        expect(getByText("Passwords must match")).toBeInTheDocument()

        expect(window.location.href).toContain("signup");

        fireEvent.change(emailNode, { target: { value: email } });
        fireEvent.change(passwordNode, { target: { value: password } });

        fireEvent.submit(getByTestId(/form/i));

        jest.runAllTimers();

        expect(window.location.href).toContain("welcome");
        expect(getByTestId("firstname").textContent).toContain(firstName);
        expect(getByTestId("email").textContent).toEqual(email);
    });
});
