import React from "react";
import { renderWithMemoryRouter } from "../test-utils";
import { fireEvent } from "@testing-library/dom";
import faker from "faker";
import Signup from "./Signup";

describe("Signup", () => {
    it("renders Sign Up prompt", () => {
        const { getByText } = renderWithMemoryRouter(<Signup />);
        expect(getByText("Sign Up")).toBeInTheDocument();
    });

    it("calls handleSubmit when user submits form", () => {
        const handleSubmit = jest.fn();
        const { getByTestId } = renderWithMemoryRouter(<Signup />);

        const submitButtonNode = getByTestId(/form/i);
        fireEvent.submit(submitButtonNode);

        expect(handleSubmit).toHaveBeenCalled();
    });

    it("displays error message if invalid email address is provided", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup />);

        const firstNameNode = getByLabelText(/first name/i);
        const emailNode = getByLabelText(/email/i);
        const passwordNode = getByLabelText(/password/i);

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(passwordNode, { target: { value: faker.internet.password() } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Invalid email address")).toBeInTheDocument();
    });

    it("doesn't display error message if form is valid", () => {
        const { getByLabelText, queryByText, getByTestId } = renderWithMemoryRouter(<Signup />);

        const firstNameNode = getByLabelText(/first name/i);
        const emailNode = getByLabelText(/email/i);
        const passwordNode = getByLabelText(/password/i);

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: faker.internet.password() } });

        fireEvent.submit(getByTestId(/form/i));

        expect(queryByText("Invalid email address")).toBeNull();
        expect(queryByText("Password cannot be the same as your email")).toBeNull();
        expect(queryByText("Password must be longer than 8 characters")).toBeNull();
    });
    it("displays an error message if password matches email", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup />);

        const emailValue = faker.internet.email();

        const firstNameNode = getByLabelText(/first name/i);
        const emailNode = getByLabelText(/email/i);
        const passwordNode = getByLabelText(/password/i);

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: emailValue } });
        fireEvent.change(passwordNode, { target: { value: emailValue } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password cannot be the same as your email")).toBeInTheDocument();
    });
    it("displays an error message if password is too short", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup />);

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
