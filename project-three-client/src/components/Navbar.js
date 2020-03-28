import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export class Navbar extends Component {
    render() {
        return (
            <Appbar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                </Toolbar>
            </Appbar>
        )
    }
}

export default Navbar