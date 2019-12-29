import React from "react";
import { renderWithMemoryRouter } from "../test-utils";
import { fireEvent } from "@testing-library/dom";
import faker from "faker";
import Signup from "./Signup";

jest.useFakeTimers();

describe("Signup", () => {
    it("renders Sign Up prompt", () => {
        const { getByText } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);
        expect(getByText("Let's Sign Up")).toBeInTheDocument();
    });
    it("takes in valid form data, doesn't throw errors, shows loading text and routes to new page", () => {
        const { getByLabelText, queryByText, getByTestId, getByText } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: faker.internet.password() } });

        fireEvent.submit(getByTestId(/form/i));

        expect(queryByText("Invalid email address")).toBeNull();
        expect(queryByText("Password cannot be the same as your email or first name")).toBeNull();
        expect(queryByText("Password must be longer than 8 characters")).toBeNull();

        expect(getByText("Saving Signup Data")).toBeInTheDocument();

        jest.runAllTimers();

        expect(window.location.href).not.toContain("signup");
    });
    it("displays error message if invalid email address is provided", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const firstNameNode = getByLabelText(/first name/i);
        const emailNode = getByLabelText(/email/i);
        const passwordNode = getByLabelText(/password/i);

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(passwordNode, { target: { value: faker.internet.password() } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Invalid email address")).toBeInTheDocument();
    });
    it("displays an error message if password matches email", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const emailValue = faker.internet.email();

        const firstNameNode = getByLabelText(/first name/i);
        const emailNode = getByLabelText(/email/i);
        const passwordNode = getByLabelText(/password/i);

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: emailValue } });
        fireEvent.change(passwordNode, { target: { value: emailValue } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password cannot be the same as your email or first name")).toBeInTheDocument();
    });
    it("displays an error message if password is too short", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const firstNameNode = getByLabelText(/first name/i);
        const emailNode = getByLabelText(/email/i);
        const passwordNode = getByLabelText(/password/i);

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: "nogood" } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password must be longer than 8 characters")).toBeInTheDocument();
    });
});
