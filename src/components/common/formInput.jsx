import React from "react";

const FormInput = ({ label, id, error, type = "text", ...rest }) => {
    return (
        <div className="form-group">
          <label htmlFor={id}>{label}</label>
          <input
            autoFocus={id === "user" && "autoFocus"}
            //placeholder={id}
            {...rest}
            type={type}
            className="form-control"
            id={id}
            aria-describedby="emailHelp"
          />
          {id === "user" && (
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else but the government or
                Vasil Bojkov.
              </small>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
        );
      };
      
      export default FormInput;
      