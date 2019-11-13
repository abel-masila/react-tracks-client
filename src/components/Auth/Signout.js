import React from "react";
import { ApolloConsumer } from "react-apollo";
import withStyles from "@material-ui/core/styles/withStyles";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Signout = ({ classes }) => {
  const handleLogout = client => {
    localStorage.removeItem("jwt-token");
    client.writeData({
      data: {
        isLoggedIn: false
      }
    });
  };
  return (
    <ApolloConsumer>
      {client => (
        <Button onClick={() => handleLogout(client)}>
          <Typography
            variant="body1"
            color="secondary"
            className={classes.buttonText}
          >
            Signout
          </Typography>
          <ExitToApp className={classes.buttonIcon} color="secondary" />
        </Button>
      )}
    </ApolloConsumer>
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonIcon: {
    marginLeft: "5px"
  }
};

export default withStyles(styles)(Signout);
