import React from "react";
import { Provider } from "react-redux";
import {BrowserRouter, Switch} from 'react-router-dom';

import store from "../redux/store";
import Routers from "./Routers"


const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Routers />
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default App;