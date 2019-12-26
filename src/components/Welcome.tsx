import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Header, Divider, Button } from "semantic-ui-react";
import ContentContainer from "../shared/ContentContainer";
import "./styles.css";

const Welcome: React.FC = () => {
    const { state } = useLocation();
    let history = useHistory();

    if (!state) {
        history.push("/signup");
        return null;
    }

    const { firstName, email } = state;

    return (
        <ContentContainer>
            <Header as="h2" textAlign="center" content={`Welcome ${firstName}!`} />
            <span>You've been registered for this awesome service. Please check your email listed below for instructions</span>
            <Divider />
            <span>
                <strong>{email}</strong>
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
