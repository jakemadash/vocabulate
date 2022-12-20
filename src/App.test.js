import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App component", () => {
    it("renders correct default language", () => {
      render(<App />);
      expect(screen.getByRole("combobox").textContent).toMatch('Swedish');
    });
  });