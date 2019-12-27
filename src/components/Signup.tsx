import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ContentContainer from "../shared/ContentContainer";
import "./styles.css";
import { User } from "../App";

interface SignupProps {
    setUser: (arg: User) => void;
}

const Signup: React.FC<SignupProps> = ({ setUser }: SignupProps) => {
    const [firstName, setFirstName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    let history = useHistory();

    const handleSubmit = () => {
        const errorArray = [];
        const validEmailRegex = /\S+@\S+\.\S+/;
        !validEmailRegex.test(email) && errorArray.push("Invalid email address");
        password.length < 8 && errorArray.push("Password must be longer than 8 characters");
        password === email && errorArray.push("Password cannot be the same as your email");
        if (errorArray.length) {
            setErrors(errorArray);
            return;
        }
        // simulating an AJAX call
        setUser({
            firstName,
            email
        });
        setLoading(true);
        setTimeout(() => {
            history.push("/welcome", { email, firstName });
        }, 500);
    };

    return (
        <ContentContainer>
            <Header
                as="h2"
                textAlign="center"
                content="Let's Sign Up"
                subheader="Use the form below to sign up for this super awesome service. You’re only a few steps away!"
            />
            <Form onSubmit={handleSubmit} error={errors.length > 0} loading={loading} data-testid="form">
                <Message error header="Please address the following errors" list={errors} />
                <Form.Input
                    label="First Name"
                    value={firstName}
                    onChange={(_e, { value }) => setFirstName(value)}
                    placeholder="Your First Name"
                    required
                    id="firstname"
                />
                <Form.Input
                    label="Email Address"
                    value={email}
                    onChange={(_e, { value }) => setEmail(value)}
                    placeholder="Your Email Address"
                    required
                    id="email"
                />
                <Form.Input
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(_e, { value }) => setPassword(value)}
                    placeholder="Your Password"
                    required
                />
                <div className="button-container">
                    <Form.Button type="submit" color="orange" floated="right" id="signup" data-testid="signupBtn">
                        Sign Up
                    </Form.Button>
                </div>
            </Form>
        </ContentContainer>
    );
};

export default Signup;
