import React, { Component } from "react";

class LikeButton extends Component {
  render() {
    let classes = "clickable fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <i
        //style={{ cursor: "pointer" }}
        onClick={this.props.onLike}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default LikeButton;

// const LikeButton = (props) => {
//   let classes = "fa fa-heart";
//   if (!props.liked) classes += "-o";
//   return <i onClick={props.onLike} className={classes} aria-hidden="true"></i>;
// };

// export default LikeButton;
