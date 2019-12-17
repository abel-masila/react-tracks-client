import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import axios from "axios";
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
import Error from "./../Shared/Error";
import { GET_TRACKS } from "./../../pages/App";

const CreateTrack = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [submiting, setSubmitting] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleAudioChange = event => {
    const selectedFile = event.target.files[0];
    const fileSizeLimit = 10000000; //10mb
    if (selectedFile && selectedFile.size > fileSizeLimit) {
      setFileError(`${selectedFile.name}: File is too large`);
    } else {
      setFile(selectedFile);
      setFileError("");
    }
  };
  const handleUpload = async () => {
    try {
      const data = new FormData();
      const apiUrl = `https://api.cloudinary.com/v1_1/masila/raw/upload`;

      data.append("file", file);
      data.append("resource_type", "raw");
      data.append("upload_preset", "react-tracks");
      data.append("cloud_name", "masila");
      const res = await axios.post(apiUrl, data);
      return res.data.url;
    } catch (err) {
      console.log(err);
      setSubmitting(false);
    }
  };
  const handleSubmit = async (event, createTrack) => {
    event.preventDefault();
    setSubmitting(true);

    //Upload to cloudinary, get return url
    const uploadedUrl = await handleUpload();
    createTrack({
      variables: {
        title,
        description,
        url: uploadedUrl
      }
    });
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
      <Mutation
        mutation={CREATE_TRACK}
        onCompleted={data => {
          //console.log(data);
          setSubmitting(false);
          setOpen(false);
          setTitle("");
          setDescription("");
          setFile("");
        }}
        refetchQueries={() => [{ query: GET_TRACKS }]}
      >
        {(createTrack, { error }) => {
          if (error) return <Error error={error} />;
          return (
            <Dialog className={classes.dialog} open={open}>
              <form onSubmit={event => handleSubmit(event, createTrack)}>
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
                      value={title}
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
                      value={description}
                    />
                  </FormControl>
                  <FormControl error={Boolean(fileError)}>
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
                      <FormHelperText>{fileError}</FormHelperText>
                    </label>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button
                    className={classes.cancel}
                    disabled={submiting}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={classes.save}
                    type="submit"
                    disabled={
                      !title.trim() || !description.trim() || !file || submiting
                    }
                  >
                    {submiting ? (
                      <CircularProgress className={classes.save} size={24} />
                    ) : (
                      "Add Track"
                    )}
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          );
        }}
      </Mutation>
    </>
  );
};

const CREATE_TRACK = gql`
  mutation($title: String!, $description: String!, $url: String!) {
    createTrack(title: $title, description: $description, url: $url) {
      track {
        id
        title
        description
        url
      }
    }
  }
`;

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
