import React from "react";
import { Header, Divider, Button } from "semantic-ui-react";
import ContentContainer from "../shared/ContentContainer";
import "./styles.css";
import { User } from "../App";

interface WelcomeProps {
    user: User;
}

const Welcome: React.FC<WelcomeProps> = ({ user }: WelcomeProps) => {
    const { firstName, email } = user;

    return (
        <ContentContainer>
            <Header as="h2" textAlign="center" content={`Welcome ${firstName}!`} data-testid="firstname" />
            <span>You've been registered for this awesome service. Please check your email listed below for instructions</span>
            <Divider />
            <span>
                <strong data-testid="email">{email}</strong>
            </span>
            <div className="button-container">
                <Button color="orange" floated="right">
                    Sign In
                </Button>
            </div>
        </ContentContainer>
    );
};

export default Welcome;
