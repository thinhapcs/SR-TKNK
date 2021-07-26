/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import { useHistory } from "react-router";
import QrReader from "react-qr-reader";
import "../App.css";
import { makeStyles, Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import auth from "./auth";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
  btn_signin:{
    paddingTop: 60,
    textAlign: "center",
  },
}));

export const Login = () => {
  const classes = useStyles();
  // History hook
  const history = useHistory();

  // User information hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleScan = (value) => {
    if (value) {
      let result = value.split(",");
      setEmail(result[0]);
      setPassword(result[1]);
      alert("Take an account");
      setError("");
    }
  };
  const handleError = (err) => {
    console.error(err);
    setError(err);
  };

  //  Function to call submit
  const handleSubmit = async (e) => {
    // Prevents page reload on wrongs creds
    e.preventDefault();
    setError("");
    try {
      const data = await auth.login(email, password);
      // Executes only when there are no 400 and 500 errors, else they are thrown as errors
      // Callbacks can be added here
      if (data) {
        history.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        // Handle errors thrown from frontend
        setError(err.message);
      } else {
        // Handle errors thrown from backend
        if (err === "LOGIN_BAD_CREDENTIALS") {
          setError("Incorrect credentials");
        } else {
          setError("Error occured in the API.");
        }
      }
    }
  };

  return (
    <>
      <h2 className={classes.root}>Login</h2>
      <QrReader
        delay={200}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <div className={classes.btn_signin}>
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          SIGN IN
        </Button>
      </div>
      <Alert
        variant="danger"
        style={error !== "" ? { display: "block" } : { display: "none" }}
      >
        {error}
      </Alert>
    </>
  );
};
