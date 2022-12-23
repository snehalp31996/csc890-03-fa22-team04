import React from "react";
import { render, screen } from "@testing-library/react";
import AboutSnehal from "../about/AboutSnehal";

test("render introduction", () => {
  render(<AboutSnehal />);
  const introElement = screen.getByRole("introduction");
  expect(introElement).toBeInTheDocument();
});

test("render email", () => {
  render(<AboutSnehal />);
  const codeToCodeElement = screen.getByRole("email");
  expect(codeToCodeElement).toBeInTheDocument();
});

test("render github", () => {
  render(<AboutSnehal />);
  const textToCodeElement = screen.getByRole("github");
  expect(textToCodeElement).toBeInTheDocument();
});

test("should render Snehal Image", () => {
  render(<AboutSnehal />);
  const imageElement = screen.getByAltText("SnehalImage");
  expect(imageElement).toHaveAttribute("src", "snehal.png");
});
