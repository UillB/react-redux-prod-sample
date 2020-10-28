import React from "react";

import Default from "./default";

import { Input } from 'antd';

const { TextArea } = Input;


export default class Paragraph extends Default {

    change = e => {
        this.setState({value: e.target.value}, this.mainValidate);
    };

    render(){
        return(
            <div className="box">
                {this.getComponentTitle()}
                <div>
                    <TextArea placeholder="Please enter your answer"
                              autosize={{ minRows: 4, maxRows: 20 }}
                              value={this.state.value}
                              onChange={this.change}/>
                </div>

            </div>
        )
    }
}

