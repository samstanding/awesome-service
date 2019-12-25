import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Header } from "semantic-ui-react";
import ContentContainer from "../shared/ContentContainer";

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
            <br />
            <span>
                <strong>{email}</strong>
            </span>
        </ContentContainer>
    );
};

export default Welcome;
