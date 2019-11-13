import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

const CreateTrack = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const handleAudioChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  return (
    <>
      <Button
        variant="fab"
        className={classes.fab}
        color="secondary"
        onClick={() => setOpen(true)}
      >
        {open ? <ClearIcon /> : <AddIcon />}
      </Button>

      <Dialog className={classes.dialog} open={open}>
        <form>
          <DialogTitle>Create Track</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add A Title, Description & Audio File
            </DialogContentText>
            <FormControl fullWidth>
              <TextField
                label="Title"
                placeholder="Add Title"
                onChange={e => setTitle(e.target.value)}
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Description"
                placeholder="Add Description"
                multiline
                rows="3"
                onChange={e => setDescription(e.target.value)}
                className={classes.textField}
              />
            </FormControl>
            <FormControl fullWidth>
              <input
                id="audio"
                required
                type="file"
                className={classes.input}
                onChange={handleAudioChange}
                accept="audio/mp3, audio/wave"
              />

              <label htmlFor="audio">
                <Button
                  variant="outlined"
                  component="span"
                  className={classes.button}
                  color={file ? "secondary" : "inherit"}
                >
                  Audio File
                  <LibraryMusicIcon className={classes.icon} />
                </Button>
                {file && file.name}
              </label>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button className={classes.cancel} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className={classes.save}
              type="submit"
              disabled={!title.trim() || !description.trim() || !file}
            >
              Add Track
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  dialog: {
    margin: "0 auto",
    maxWidth: 550
  },
  textField: {
    margin: theme.spacing.unit
  },
  cancel: {
    color: "red"
  },
  save: {
    color: "green"
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  icon: {
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: "200"
  }
});

export default withStyles(styles)(CreateTrack);
