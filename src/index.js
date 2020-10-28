import React from 'react';
import { render } from 'react-dom';

import App from "./components/App"
import 'antd/dist/antd.css';
import "./styles/_main.styl";


render(
    <App />,
    document.getElementById("app")
);

