import React from "react";

import Default from "./default";
import { Input } from 'antd';


export default class Text extends Default {

    change = e => {
        this.setState({value: e.target.value}, this.mainValidate);
    };

    render(){
        return(
            <div className="box">
                {this.getComponentTitle()}
                <div>
                    <Input placeholder="Please enter your answer"
                           size="large"
                           value={this.state.value}
                           onChange={this.change}/>
                </div>

            </div>
        )
    }
}

