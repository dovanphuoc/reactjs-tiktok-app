import React from 'react';
import '../../assets/styles/global.scss'
import { Grid, Row, Column } from '@mycv/mycv-grid'
import config from '../../config'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Header from '../../container/Header';
import Home from '../../container/Home'
import FollowContainer from '../../container/FollowContainer';
import Sidebar from '../../container/Sidebar'

const App = () => {
    return (
        <Router>
            <Grid>
                <Header />
                <Grid type="wide" maxWidth={config.mainWidth}>
                    <Row>
                        <Column sizeDesktop={4}>
                            <Sidebar />
                        </Column>
                        <Column sizeDesktop={8}>
                            <Switch>
                                <Route exact path={config.routes.home} component={Home}></Route>
                                <Route path={config.routes.follow} component={FollowContainer}></Route>
                            </Switch>
                        </Column>
                    </Row>
                </Grid>
            </Grid>
        </Router>
    );
};

export default App;