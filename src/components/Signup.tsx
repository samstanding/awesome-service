import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ContentContainer from "../shared/ContentContainer";

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    let history = useHistory();

    const handleSubmit = () => {
        // TODO: some validation here
        history.push("/welcome", { email, firstName });
    };

    return (
        <ContentContainer>
            <Header
                as="h2"
                textAlign="center"
                content="Let's Sign Up"
                subheader="Use the form below to sign up for this super awesome service. You're only a few steps away!"
            />
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="First Name"
                    value={firstName}
                    onChange={(_e, { value }) => setFirstName(value)}
                    placeholder="Your First Name"
                    required
                />
                <Form.Input
                    label="Email Address"
                    value={email}
                    onChange={(_e, { value }) => setEmail(value)}
                    placeholder="Your Email Address"
                    required
                />
                <Form.Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(_e, { value }) => setPassword(value)}
                    placeholder="Your Password"
                    required
                />
                <Form.Button type="submit" color="orange">
                    Sign Up
                </Form.Button>
            </Form>
        </ContentContainer>
    );
};

export default Signup;
