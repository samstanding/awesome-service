import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

export const renderWithMemoryRouter = (component: ReactElement) => render(<MemoryRouter>{component}</MemoryRouter>);

