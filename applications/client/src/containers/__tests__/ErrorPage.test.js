import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../errorPage/ErrorPage";
import { BrowserRouter as Router } from "react-router-dom";

test("render Error Page", () => {
  render(
    <Router>
      <ErrorPage />
    </Router>
  );
  const introElement = screen.getByText(/404/i);
  expect(introElement).toBeInTheDocument();
});

test("Back to home page button should be rendered", () => {
  render(
    <Router>
      <ErrorPage />
    </Router>
  );
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});
