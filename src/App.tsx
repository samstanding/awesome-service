import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";

export interface User {
    firstName: string;
    email: string;
}

const App: React.FC = () => {
    const [user, setUser] = useState<User>({ firstName: "", email: "" });
    return (
        <Router>
            <Switch>
                <Route exact path="/signup">
                    <Signup setUser={setUser} />
                </Route>
                {user.email && (
                    <Route path="/welcome">
                        <Welcome user={user} />
                    </Route>
                )}
                <Route path="/">
                    <Redirect to="/signup" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
