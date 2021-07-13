import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../helpers/axiosWithAuth";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import AddFriend from "./AddFriend";
import { Route } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
    textAlign: "center",
    alignContent: "center",
    margin: 20,
  },
});

export default function FriendsList(props) {
  const [friends, setFriends] = useState([]);
  const getData = () => {
    axiosWithAuth()
      .get("/friends")
      .then((res) => {
        console.log(res.data);
        setFriends(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Route exact path="/FriendList" component={AddFriend} />
      {friends.map((friend) => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {friend.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h3">
                Age: {friend.age}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Email: {friend.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Grid>
  );
}
