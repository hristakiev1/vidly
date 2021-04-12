import React, { Component } from "react";
import Joi from "joi-browser";
import FormInput from "./formInput";
import Dropdown from "./dropdown";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Dropdown
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    console.log(errors);
    return (
      <FormInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

// class Form extends Component {
//   state = { data: {}, errors: {} };

//   validate = () => {
//     const result = Joi.validate(this.state.data, this.schema, {
//       abortEarly: false,
//     });

//     if (!result.error) return null;

//     const errors = {};

//     for (let item of result.error.details) errors[item.path[0]] = item.message;
//     return errors;
//   };

//   validateProperty = ({ id, value }) => {
//     const obj = { [id]: value };
//     const schema = { [id]: this.schema[id] };
//     const { error } = Joi.validate(obj, schema);

//     return error ? error.details[0].message : null;

//     // if (input.id === "user") {
//     //   if (input.value.trim() === "") return "Username is required";
//     //   if (!input.value.includes("@")) return "User name must be a valid email";
//     // }
//     // if (input.id === "pass") {
//     //   if (input.value.trim() === "") return "Password is required";
//     //   if (input.value.length < 5) return "Passowrd is too short";
//     // }
//   };

//   handleChange = ({ currentTarget: input }) => {
//     // or you can use  (event) without destructuring
//     const errors = { ...this.state.errors };
//     const errorMessage = this.validateProperty(input);

//     if (errorMessage) errors[input.id] = errorMessage;
//     else delete errors[input.id];

//     let data = { ...this.state.data };
//     data[input.id] = input.value; // and then use event.currentTarget.id
//     this.setState({ data, errors });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();

//     const errors = this.validate();
//     this.setState({ errors: errors || {} });
//     if (errors) return;

//     this.doSubmit();
//   };

//   renderInput = (label, id, type) => {
//     const { data, errors } = this.state;
//     return (
//       <FormInput
//         label={label}
//         id={id}
//         type={type}
//         value={data[id]}
//         onChange={this.handleChange}
//         error={errors[id]}
//       />
//     );
//   };

//   renderDropdown = (label, id, options) => {
//     const { data, errors } = this.state;
//     return (
//       <Dropdown
//         label={label}
//         id={id}
//         error={errors[id]}
//         onChange={this.handleChange}
//         value={data[id]}
//         options={options}
//       />
//     );
//   };

//   renderButton = (label) => {
//     return (
//       <button disabled={this.validate()} className="btn btn-primary">
//         {label}
//       </button>
//     );
//   };
// }

// // username = React.createRef(); after that in the input field ref={this.username} // Lesson 5 Forms -> 4. Refs

// export default Form;
