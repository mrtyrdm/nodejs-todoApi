import "styles/app.scss";
import "styles/global.scss";
import {Provider} from "react-redux";
import store from "redux/store";
import "./i18n";

import Home from "pages";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from "react";
import PrivateRoute from "./pages/privateRoute";


function App(): JSX.Element {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route element={<PrivateRoute />}>
                            <Route element={<Home/>} path="/" />
                        </Route>
                        <Route element={<Login/>} path="/login"/>
                    </Routes>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
