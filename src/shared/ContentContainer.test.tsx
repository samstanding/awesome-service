import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ContentContainer from "./ContentContainer";

Enzyme.configure({ adapter: new Adapter() });

describe("fuck testing", () => {
    test("fucking fuck", () => {
        const wrapper = shallow(
            //@ts-ignore
            <ContentContainer
                props={
                    <>
                        {" "}
                        <h1>fuck this</h1>{" "}
                    </>
                }
            />
        );
        expect(wrapper.exists()).toBe(true);
    });
});
