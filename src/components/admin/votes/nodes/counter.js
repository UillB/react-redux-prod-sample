import React, {Fragment} from "react";

import DefaultNode from "./DefaultNode";


export default class Counter extends DefaultNode {

    getBody = () => {
        return <Fragment>
            {this.getOptions()}
        </Fragment>
    };
}
