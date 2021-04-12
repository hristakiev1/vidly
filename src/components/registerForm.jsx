import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      user: "",
      pass: "",
      name: "",
    },
    errors: {},
  };

  doSubmit = () => {
    //call Server
    console.log(this.state.data);
  };

  schema = {
    user: Joi.string().email().required().max(15).label("Username"),
    pass: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Username", "user")}
          {this.renderInput("Password", "pass", "password")}
          {this.renderInput("Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
