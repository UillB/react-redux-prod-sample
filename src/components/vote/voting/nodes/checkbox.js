import React from "react"

import Default from "./default"
import { Checkbox as AppCheckbox } from 'antd';


const CheckboxGroup = AppCheckbox.Group;

export default class Checkbox extends Default {

    toggleCheckbox = checkedValues => {
        this.setState({value: checkedValues}, this.mainValidate);
    };

    // validate = () => {
    //     let size = this.selectedCheckboxes.size;
    //     let {min, max} = this.props;
    //     return  max == 0 || size >= min && size <= max;
    // };

    getOptions = () => {
        let options = this.props.options;
        return options.length ? <CheckboxGroup value={this.state.value} options={options.map(item => ({label: item.title, value: item.id}))} onChange={this.toggleCheckbox} /> : null
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
