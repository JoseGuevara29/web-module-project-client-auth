import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import FriendList from "./components/FriendsList";
import AddFriend from "./components/AddFriend";

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/FriendList" component={FriendList} />
        <Route path="/" component={LogIn} />
      </Switch>
    </Router>
  );
}

export default App;
