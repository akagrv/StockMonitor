import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withAlert } from "react-alert";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    // check if there is a change in the error
    const { error, message, alert } = this.props;
    if (error != prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.password)
        alert.error(`Password: ${error.msg.password.join()}`);
      if (error.msg.username)
        alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.detail) alert.error(error.msg.detail);
    }

    if (message != prevProps.message) {
      if (message.msg) alert.success(message.msg);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

// using withAlert - we will have access to the alert in the props
export default connect(mapStateToProps)(withAlert()(Alerts));
