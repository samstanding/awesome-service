import React from "react";
import Enzyme, { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Adapter from "enzyme-adapter-react-16";
import Signup from "./Signup";

Enzyme.configure({ adapter: new Adapter() });

describe("Signup", () => {
    test("page renders", () => {
        const wrapper = shallow(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        expect(wrapper.exists()).toBe(true);
    });

    test("input is echoed", () => {
        const wrapper = shallow(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
        wrapper.find("").simulate("change", {
            target: { value: "Fox" }
        });
        expect(wrapper.find("input").props().value).toEqual("Fox");
    });
});
