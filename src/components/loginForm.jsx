import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      user: "",
      pass: "",
    },
    errors: {},
  };

  schema = {
    user: Joi.string().required().label("Username"),
    pass: Joi.string().min(6).required().label("Password"),
  };

  doSubmit = () => {
    //Call the server

    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "user")}
          {this.renderInput("Password", "pass", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
