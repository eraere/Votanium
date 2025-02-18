import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Vote from './Vote';
import Results from './Results';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Blockchain Voting System
                    </Typography>
                    <Button color="inherit" href="/login">Login</Button>
                    <Button color="inherit" href="/register">Register</Button>
                </Toolbar>
            </AppBar>
            <div className="App">
                <Switch>
                    <Route path="/vote" component={Vote} />
                    <Route path="/results" component={Results} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    );
}

export default App; 