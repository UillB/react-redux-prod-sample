import React from "react"

import Default from "./default"

import { Select as VoteSelect } from 'antd';
const Option = VoteSelect.Option;


export default class Select extends Default {

    change = value => {
        this.setState({value}, this.mainValidate);
    };

    getOptions = () => {
        let options = this.props.options;
        return options && options.length && options.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>) || null;
    };

    render(){
        return(
            <div className="box">
                {this.getComponentTitle()}
                {this.state.value ?
                    <VoteSelect size='large' style={{ width: 250 }} placeholder="Select your option" value={this.state.value} onChange={this.change}>
                        {this.getOptions()}
                    </VoteSelect> :

                    <VoteSelect size='large' style={{ width: 250 }} placeholder="Select your option" onChange={this.change}>
                        {this.getOptions()}
                    </VoteSelect>
                }
            </div>
        )
    }
}
