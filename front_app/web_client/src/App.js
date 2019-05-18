import React, { Component } from 'react';
import AreaPage from './components/area/Area';
import SignInPage from './components/auth/SignIn';
import SignUpPage from './components/auth/SignUp';
import ServicesListPage from './components/area/ServicesList';
import ProfilePage from './components/area/Profile';
import AreaFormPage from './components/area/AreaForm';
import Download from './FileDownload'
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from './constants/routes';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <Route exact path={routes.HOME} component={AreaPage} />
                <Route exact path={routes.SIGN_IN} component={SignInPage} />
                <Route exact path={routes.SIGN_UP} component={SignUpPage} />
                <Route exact path={routes.PROFILE} component={ProfilePage} />
                <Route exact path={routes.SERVICE} component={ServicesListPage} />
                <Route exact path={routes.AREA_FORM} component={AreaFormPage} />
                <Route exact path={routes.CLIENT_APK} component={Download}/>
            </div>
        </Router>

    );
  }
}

export default App;
