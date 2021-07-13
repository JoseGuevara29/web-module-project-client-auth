import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import FriendsList from "./FriendsList";

const useStyles = makeStyles({
  root: {
    width: 500,
    textAlign: "center",
    alignContent: "center",
    margin: 20,
  },
});

export default function AddFriend() {
  const classes = useStyles();

  const [friend, setFriend] = useState([]);
  const handleChanges = (e) => {
    console.log("value: ", e.target.value);
    setFriend({ ...friend, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", friend)
      .then((res) => {
        console.log("posted new friend", res.data);
        setFriend(...friend, res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <TextField
          variant="filled"
          name="name"
          label="Name"
          type="text"
          onChange={handleChanges}
        />
        <TextField
          variant="filled"
          name="age"
          label="Age"
          type="text"
          onChange={handleChanges}
        />
        <TextField
          variant="filled"
          name="email"
          label="Email"
          type="text"
          onChange={handleChanges}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.root}
          className={classes.submit}
        >
          Add Friend
        </Button>
      </Grid>
      {/* <FriendsList friend={friend} setFriend={setFriend} /> */}
    </form>
  );
}
