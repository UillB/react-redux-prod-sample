import React from "react";

import Default from "./default";
import { Radio as RadioButton } from 'antd';

const RadioGroup = RadioButton.Group;


export default class Radio extends Default {
    
    change = e => {
        this.setState({value: e.target.value}, this.mainValidate);
    };

    getOptions = () => {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let options = this.props.options;
        return options && options.length && <RadioGroup onChange={this.change} value={this.state.value}>
            {options.map(item => <RadioButton style={radioStyle} key={item.id} value={item.id}>{item.title}</RadioButton>) || null}
        </RadioGroup> || null;
    };

    render(){

        return(
            <div className="box">
                {this.getComponentTitle()}
                {this.getOptions()}
            </div>
        )
    }
}

