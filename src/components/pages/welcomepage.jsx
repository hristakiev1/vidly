import React, { Component } from "react";

class WelcomePage extends Component {
  handleEnter = () => {
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <div>
        <h1>Welcome to Vidly</h1>
        <button className="btn btn-dark" onClick={this.handleEnter}>
          Enter
        </button>
      </div>
    );
  }
}

export default WelcomePage;
