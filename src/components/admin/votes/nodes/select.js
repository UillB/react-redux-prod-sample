import React, {Fragment} from "react";

import DefaultNode from "./DefaultNode";


export default class Select extends DefaultNode {

    getBody = () => {
        return <Fragment>
            {this.getOptions()}
        </Fragment>
    };
}
