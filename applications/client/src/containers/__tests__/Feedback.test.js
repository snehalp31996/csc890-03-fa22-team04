import { render, screen} from "@testing-library/react";
import Feedback from "../feedback/Feedback";
import { BrowserRouter as Router } from "react-router-dom";

test("renders feedback table", () => {
  render(
    <Router>
      <Feedback />
    </Router>
  );
  const table = screen.getByTestId("feedback-table");
  expect(table).isInTheDocument;
});

test("renders header in Feedback Table", () => {
  render(
    <Router>
      <Feedback />
    </Router>
  );
  const headers = screen.getAllByRole("columnheader");
  expect(headers).isInTheDocument;
});

test("renders rows in Feedback Table", () => {
  render(
    <Router>
      <Feedback />
    </Router>
  );
  const rows = screen.getAllByRole("table-rows");
  expect(rows).isInTheDocument;
});
