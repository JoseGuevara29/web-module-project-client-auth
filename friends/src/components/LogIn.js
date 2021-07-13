import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const initialstate = {
    username: "",
    password: "",
  };
  const [isloading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState(initialstate);

  const history = useHistory();

  const handleChanges = (e) => {
    console.log("value: ", e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    console.log("credentials: ", credentials);
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        console.log("happy path: ", res.data.payload);
        localStorage.setItem("token", res.data.payload);
        setIsLoading(false);
        history.push("/FriendList");
      })
      .catch((err) => {
        console.log("sad path: ", err);
        setIsLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {isloading ? (
          <CircularProgress />
        ) : (
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChanges}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChanges}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitSignIn}
            >
              Sign In
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
}
