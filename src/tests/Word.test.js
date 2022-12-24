import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import Word from "../components/Word";

const testEntry = {
    headword: {
      pos: "noun",
      text: "test",
      pronunciation: { value: "tɛst" },
    },
    senses: [
      {
        examples: [
          {
            text: "This is the test example.",
            translations: {
              en: { text: "This is the 'translated' test example." },
            },
          },
        ],
        translations: {
          en: [
            {
              text: "This is the first test translation.",
            },
            { text: "This is the second test translation." },
          ],
        },
      },
    ],
  };

describe("Word component", () => {
  it("renders correct values from API data", () => {
    render(<Word entry={testEntry} />);
    expect(
      screen.getByRole("generic", { name: "word-text" }).textContent
    ).toMatch("test");
    expect(
      screen.getByRole("generic", { name: "pronunciation" }).textContent
    ).toMatch("tɛst");
    expect(
      screen.getByRole("generic", { name: "part-of-speech" }).textContent
    ).toMatch("noun");
    expect(screen.getByRole("generic", { name: "1" }).textContent).toMatch(
      "This is the first test translation."
    );
    expect(screen.getByRole("generic", { name: "2" }).textContent).toMatch(
      "This is the second test translation."
    );
    expect(
        screen.getByRole("generic", { name: "example" }).textContent
      ).toMatch("This is the test example.");
      expect(
        screen.getByRole("generic", { name: "example-translation" }).textContent
      ).toMatch("This is the 'translated' test example.");
  });

  it("renders correct color from props", async () => {
    const testColor = "#d9b929";
    render(<Word entry={testEntry} color={testColor} />)
    expect(screen.getByRole('generic', {name: 'word-text'}).style.color).toMatch('rgb(217, 185, 41)')
  })
});
