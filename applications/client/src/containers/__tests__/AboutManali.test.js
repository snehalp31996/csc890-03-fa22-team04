import React from "react";
import { render, screen } from "@testing-library/react";
import AboutManali from "../about/AboutManali";

test("render introduction", () => {
  render(<AboutManali />);
  const introElement = screen.getByRole("introduction");
  expect(introElement).toBeInTheDocument();
});

test("render email", () => {
  render(<AboutManali />);
  const codeToCodeElement = screen.getByRole("email");
  expect(codeToCodeElement).toBeInTheDocument();
});

test("render github", () => {
  render(<AboutManali />);
  const textToCodeElement = screen.getByRole("github");
  expect(textToCodeElement).toBeInTheDocument();
});

test("should render Manali Image", () => {
  render(<AboutManali />);
  const imageElement = screen.getByAltText("ManaliImage");
  expect(imageElement).toHaveAttribute("src", "manali.png");
});
