import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"
import App from "../App";

describe("App component", () => {
    it("renders correct default language", () => {
      render(<App />);
      expect(screen.getByRole("combobox").textContent).toMatch('Swedish');
    });

    it("disables controls while new language is loading", () => {
      render(<App />);
      userEvent.selectOptions(screen.getByRole('combobox'), ['Norwegian']);
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("combobox")).toBeDisabled();
    })

    it("displays error message if API response not okay", async () => {
      const response = new Response(null, {status: 404})
      global.fetch = jest.fn(() => Promise.resolve(response)
    );
     await render(<App />);
      expect(screen.getByRole('generic', {name: 'App'}).textContent).toMatch('An error occurred. Please refresh the page or try again later.')
    })

    // it("renders data from Word component", async () => {
    //   <Word /> = jest.fn((null))
    //   const response = new Response(null, {status: 404})
    //   global.fetch = jest.fn(() => Promise.resolve(response)
    // );
    //  await render(<App />);
    //   expect(screen.getByRole('generic', {name: 'App'}).textContent).toMatch('An error occurred. Please refresh the page or try again later.')
    // })
    
  });