import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route path="/welcome">
                    <Welcome />
                </Route>
                <Route path="/">
                    <Redirect to="/signup" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
