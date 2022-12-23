import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

const Feedback = () => {

  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);

  const callGetFeedback = async () => {
    try {
      const res = await fetch("/api/auth/feedback", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const data = await res.json();
      setFeedbacks(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callGetFeedback();
  }, []);

  return (
    <div className="base-container">
      <div className="div-containerrow">
        <h1> Student Feedback </h1>
      </div>
      <br />
      
      <Table bordered hover striped responsive variant="dark" data-testid="feedback-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Input Question</th>
            <th>Output Answer</th>
            <th>Student Feedback</th>
            <th>Response Rating</th>
          </tr>
        </thead>

        <tbody role="table-rows">
          {
            feedbacks.map(userFeedback => {
              return (
                <>
                  {userFeedback.feedbacks && userFeedback.feedbacks.map((feedback) => {
                    return (
                    <tr> 
                      <td>{feedback.email}</td>
                      <td>{feedback.question}</td>
                      <td>{feedback.answer}</td>
                      <td>{feedback.feedback}</td>
                      <td>{feedback.userRating}</td>
                    </tr>
                    )
                  })}
                </>
              )
            })
          }
        </tbody>

      </Table>
    </div>
  );
};

export default Feedback;
