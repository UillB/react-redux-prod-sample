import React, {Fragment} from "react";

import DefaultNode from "./DefaultNode";


export default class Paragraph extends DefaultNode {

    getBody = () => {
        return <Fragment>
            <div>Paragraph</div>
        </Fragment>
    };
}

