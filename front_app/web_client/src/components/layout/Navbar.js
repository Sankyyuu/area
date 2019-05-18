import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Redirect } from "react-router-dom";
import '../../styles/css/navbar.css'


class Navbar extends React.Component {

    componentDidMount() {
        if (localStorage.getItem("user") === "null") {
            console.log("SALUT ");
        } else {
            console.log("user exist")
        }
        console.log(localStorage.getItem("user"))
    }

    doSignOut = () => {
        localStorage.setItem("user", null);
        this.forceUpdate();
        console.log("DECONNEXION")
    };

    render() {
        if (localStorage.getItem("user") === "null")
            return <Redirect to="/" />
        return (
            <div className="root">
                <AppBar position="fixed" className="color">
                    <Toolbar>
                        <div className="grow">
                            <Button href="/home" className="button_area">
                                <Typography variant="title" className="colorTitle">
                                    AREA
                                </Typography>
                            </Button>
                        </div>
                        <Button variant="contained" color="primary" href="/home" className="button">
                            Your kitchen
                        </Button>
                        <Button color="inherit" href="/serviceslist">
                            Ingredients List
                        </Button>
                        <Button href="/profile">
                            <Avatar alt=""
                                    src={require("../../styles/icons/default_avatar.png")}
                                    className="avatar"
                            />
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.doSignOut}>
                            Sign Out
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}


export default Navbar;