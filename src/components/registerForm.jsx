import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { registerUser } from "../services/registerUserService";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../services/loginService";
import auth from "../services/userService";

import "react-toastify/dist/ReactToastify.css";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().max(15).label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
    const {
      data: { email, password },
    } = this.state;
    try {
      await registerUser(this.state.data);
      const { data: jwt } = await login(email, password);
      toast("User sucsessfuly registered");
      auth.setUserToken(jwt);

      setTimeout(() => {
        //this.props.history.push("/movies");
        window.location = "/movies";
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        toast.error(error.response.data);
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
