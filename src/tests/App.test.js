import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Home from "../views/Home";

describe("Home component", () => {
  it("renders correct default language", () => {
    render(<Home />);
    expect(screen.getByRole("combobox").textContent).toMatch("Swedish");
  });

  it("disables controls while new language is loading", () => {
    render(<Home />);
    userEvent.selectOptions(screen.getByRole("combobox"), ["Norwegian"]);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("displays error message if API response not okay", async () => {
    const response = new Response(null, { status: 404 });
    global.fetch = jest.fn(() => Promise.resolve(response));
    await render(<Home />);
    expect(screen.getByRole("generic", { name: "App" }).textContent).toMatch(
      "An error occurred. Please refresh the page or try again later."
    );
  });
});
