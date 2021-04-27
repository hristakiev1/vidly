import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import auth from "../services/userService";
import { login } from "../services/loginService";
import "react-toastify/dist/ReactToastify.css";

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

  doSubmit = async () => {
    try {
      const {
        data: { user, pass },
      } = this.state;
      const { data: jwt } = await login(user, pass);
      auth.setUserToken(jwt);
      toast.success("Logged successfully");
      const { historyLocation } = this.props.location;
      setTimeout(() => {
        return (window.location = historyLocation
          ? historyLocation.from.pathname
          : "/movies");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.user = error.response.data;
        this.setState({ errors });
        toast.error("invalid username or password");
      }
    }
  };

  render() {
    if (auth.getUser()) return <Redirect to="/movies" />;
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("user", "Username")}
          {this.renderInput("pass", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
