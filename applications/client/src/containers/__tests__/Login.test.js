import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../account/Login";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "../../App";

test("email input should be rendered", () => {
  const state = {
    isLoggedIn: false,
  };
  render(
    <UserContext.Provider value={{ state }}>
      <Router>
        <Login />
      </Router>
    </UserContext.Provider>
  );
  const emailElement = screen.getByPlaceholderText(/Email/i);
  expect(emailElement).toBeInTheDocument();
});

test("password input should be rendered", () => {
  const state = {
    isLoggedIn: false,
  };
  render(
    <UserContext.Provider value={{ state }}>
      <Router>
        <Login />
      </Router>
    </UserContext.Provider>
  );
  const passwordElement = screen.getByPlaceholderText(/password/i);
  expect(passwordElement).toBeInTheDocument();
});

test("Login button should be rendered", () => {
  const state = {
    isLoggedIn: false,
  };
  render(
    <UserContext.Provider value={{ state }}>
      <Router>
        <Login />
      </Router>
    </UserContext.Provider>
  );
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("should render Login Image", () => {
  const state = {
    isLoggedIn: false,
  };
  render(
    <UserContext.Provider value={{ state }}>
      <Router>
        <Login />
      </Router>
    </UserContext.Provider>
  );
  const imageElement = screen.getByAltText("Login");
  expect(imageElement).toHaveAttribute("src", "account.svg");
});

const setup = () => {
  const state = {
    isLoggedIn: false,
  };
  const utils = render(
    <UserContext.Provider value={{ state }}>
      <Router>
        <Login />
      </Router>
    </UserContext.Provider>
  );
  const input = utils.getByPlaceholderText("Email");
  return {
    input,
    ...utils,
  };
};

test("It should allow email to be inputted", () => {
  const { input } = setup();
  expect(input.value).toBe(""); // empty before
  fireEvent.change(input, { target: { value: "email@gmail.com" } });
  expect(input.value).toBe("email@gmail.com");
});

test("does not trigger when required fields are empty", async () => {
  const onSubmit = jest.fn();
  const state = {
    isLoggedIn: false,
  };
  render(
    <UserContext.Provider value={{ state }}>
      <Router>
        <Login />
      </Router>
    </UserContext.Provider>
  );
  const submitButton = screen.getByRole("button");
  await waitFor(() => userEvent.click(submitButton));
  expect(onSubmit).toHaveBeenCalledTimes(0);
});
