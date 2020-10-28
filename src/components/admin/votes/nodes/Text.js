import React, {Fragment} from "react";

import DefaultNode from "./DefaultNode";


export default class Text extends DefaultNode {

    getBody = () => {
        return <Fragment>
            <div>Short Answer</div>
        </Fragment>
    };
}

