import React from "react";
// import Button from "@material-ui/core/Button";
// import withStyles from "@material-ui/core/styles/withStyles";
// import Snackbar from "@material-ui/core/Snackbar";

const Error = ({ classes }) => {
  return <div>Error</div>;
};

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(Error);
