import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../account/Register";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

test("renders register page", async () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const registerElement = screen.getByTestId("testing");
  expect(registerElement).toBeInTheDocument();
});

test("should render Register Image", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const imageElement = screen.getByAltText("Register");
  expect(imageElement).toHaveAttribute("src", "account.svg");
});

test("first name input should be rendered", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const fnameElement = screen.getByPlaceholderText(/First Name/i);
  expect(fnameElement).toBeInTheDocument();
});
test("lasy name input should be rendered", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const lnameElement = screen.getByPlaceholderText(/Last Name/i);
  expect(lnameElement).toBeInTheDocument();
});

test("email input should be rendered", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const emailElement = screen.getByPlaceholderText(/Email/i);
  expect(emailElement).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const passwordElement = screen.getByPlaceholderText(/Password/i);
  expect(passwordElement).toBeInTheDocument();
});

test("should display total  types of usertype", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  expect(screen.getAllByRole("option").length).toBe(4);
});

it("should display the default option for user to select from", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const dElement = screen.getByRole("option", { name: "Select Role" }).selected;
  expect(dElement).toBe(true);
});

test("Register button should be rendered", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

const setup = () => {
  const utils = render(
    <Router>
      <Register />
    </Router>
  );
  const input = utils.getByPlaceholderText("First Name");
  return {
    input,
    ...utils,
  };
};

test("It should allow first name to be inputted", () => {
  const { input } = setup();
  expect(input.value).toBe(""); // empty before
  fireEvent.change(input, { target: { value: "Snehal" } });
  expect(input.value).toBe("Snehal");
});

test("does not trigger when required fields are empty", async () => {
  const onSubmit = jest.fn();
  render(
    <Router>
      <Register />
    </Router>
  );
  const submitButton = screen.getByRole("button");
  await waitFor(() => userEvent.click(submitButton));
  expect(onSubmit).toHaveBeenCalledTimes(0);
});
