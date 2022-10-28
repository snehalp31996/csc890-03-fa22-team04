import React from "react";
import { Table } from "react-bootstrap";

const Feedback = () => {
  return (
    <div className="base-container">
      <div className="div-containerrow">
        <h1> Student Feedback </h1>
      </div>
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Input Question</th>
            <th>Output Answer</th>
            <th>Student Feedback</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Feedback;
