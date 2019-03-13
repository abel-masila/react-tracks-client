import React from "react";
// import IconButton from "@material-ui/core/IconButton";
// import ThumbUpIcon from "@material-ui/icons/ThumbUp";
// import withStyles from "@material-ui/core/styles/withStyles";

const LikeTrack = ({ classes }) => {
  return <div>LikeTrack</div>;
};

const styles = theme => ({
  iconButton: {
    color: "deeppink"
  },
  icon: {
    marginLeft: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(LikeTrack);
