import React from "react";
import { render } from "@testing-library/react";
import faker from "faker";
import ContentContainer from "./ContentContainer";

describe("ContentContainer", () => {
    it("renders its children", () => {
        const header = faker.hacker.phrase();
        const NewHeader: React.FC = () => <h1>{header}</h1>;

        const NewComponent: React.FC = () => (
            <div>
                <p>Not an empty div</p>
            </div>
        );

        const { getByText } = render(
            <ContentContainer>
                <NewHeader />
                <NewComponent />
            </ContentContainer>
        );

        expect(getByText(header)).toBeInTheDocument();
    });
});
