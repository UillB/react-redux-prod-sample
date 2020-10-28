import React, {Fragment} from "react";

import DefaultNode from "./DefaultNode";


export default class DateTime extends DefaultNode {

    getBody = () => {
        return <Fragment>
            <div>Date/Time</div>
        </Fragment>
    };
}

