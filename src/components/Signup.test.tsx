import React from "react";
import { renderWithMemoryRouter } from "../test-utils";
import { fireEvent } from "@testing-library/dom";
import faker from "faker";
import Signup from "./Signup";

describe("Signup", () => {
    it("renders Sign Up prompt", () => {
        const { getByText } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);
        expect(getByText("Let's Sign Up")).toBeInTheDocument();
    });
    it("displays validation rules, takes in valid form data, doesn't throw errors, shows loading text", () => {
        const { getByLabelText, queryByText, getByTestId, getByText } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);
        const password = faker.internet.password();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        expect(getByText("Password needs to be longer than 8 characters")).toBeInTheDocument();
        expect(getByText("Password should not match your first name or email address")).toBeInTheDocument();

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: password } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        fireEvent.submit(getByTestId(/form/i));

        expect(queryByText("Invalid email address")).toBeNull();
        expect(queryByText("Password cannot be the same as your email or first name")).toBeNull();
        expect(queryByText("Password must be longer than 8 characters")).toBeNull();
        expect(queryByText("Passwords must match")).toBeNull();

        expect(getByText("Saving Signup Data")).toBeInTheDocument();
    });
    it("displays error message if email is invalid", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const password = faker.internet.password();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(passwordNode, { target: { value: password } });
        fireEvent.change(passwordConfirmNode, { target: { value: password } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Invalid email address")).toBeInTheDocument();
    });
    it("displays an error message if password matches email", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);
        const emailValue = faker.internet.email();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: emailValue } });
        fireEvent.change(passwordNode, { target: { value: emailValue } });
        fireEvent.change(passwordConfirmNode, { target: { value: emailValue } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password cannot be the same as your email or first name")).toBeInTheDocument();
    });
    it("displays an error if password matches first name", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);
        const firstName = faker.name.firstName();

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: firstName } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: firstName } });
        fireEvent.change(passwordConfirmNode, { target: { value: firstName } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password cannot be the same as your email or first name")).toBeInTheDocument();
    });
    it("displays an error message if password is too short", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: "nogood" } });
        fireEvent.change(passwordConfirmNode, { target: { value: "nogood" } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Password must be longer than 8 characters")).toBeInTheDocument();
    });
    it("displays an error if password and confirm password don't match", () => {
        const { getByLabelText, getByText, getByTestId } = renderWithMemoryRouter(<Signup setUser={jest.fn()} />);

        const firstNameNode = getByLabelText("First Name");
        const emailNode = getByLabelText("Email Address");
        const passwordNode = getByLabelText("Password");
        const passwordConfirmNode = getByLabelText("Confirm Password");

        fireEvent.change(firstNameNode, { target: { value: faker.name.firstName() } });
        fireEvent.change(emailNode, { target: { value: faker.internet.email() } });
        fireEvent.change(passwordNode, { target: { value: faker.internet.password() } });
        fireEvent.change(passwordConfirmNode, { target: { value: faker.internet.password() } });

        fireEvent.submit(getByTestId(/form/i));

        expect(getByText("Passwords must match")).toBeInTheDocument();
    });
});
