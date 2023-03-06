import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom"
import axios from "axios";

import NavBar from "./NavBar"

class ContactUs extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    message: "",
    successMessage: "",
    errorMessage: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, email, subject, message } = this.state;
    axios
      .post("http://localhost:4000/send-email", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      })
      .then((response) => {
        this.setState({
          successMessage: "Email sent successfully",
          errorMessage: "",
        });
      })
      .catch((error) => {
        this.setState({
          successMessage: "",
          errorMessage: "Error sending email",
        });
      });
  };

  render() {
    const { name, email, subject, message, successMessage, errorMessage } = this.state;

    return (
      <div>

<div class="navbar-container">
                    <NavBar />
                </div>
<br /> <br /> <br /><br /> <br /> <br />

        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={this.handleSubmit}>
        <label>
            Name:
            <input
              type="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Subject:
            <input
              type="subject"
              name="subject"
              value={subject}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Message:
            <textarea
              name="message"
              value={message}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Send</button>
          <Link className="red-button" to={"/Home"}>Cancel</Link>
        </form>
      </div>
    );
  }
}

export default ContactUs;
