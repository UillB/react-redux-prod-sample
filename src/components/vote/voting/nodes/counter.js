import React from "react";

import Default from "./default";
import WrappedCounter from "./parts/counterOption";


export default class Select extends Default {

    getOptions = () => {
        let options = this.props.options;
        return options && options.length && options.map(item => <WrappedCounter key={item.id} {...item}
                                                                               setOption={this.setOption}
                                                                               value={this.state.value && this.state.value[item.id] || 0} />) || null;
    };

    setOption = (id, value) => {
        let values = {...this.state.value};
        if(+value === 0 ){
            delete values[id];
        } else {
            values[id] = +value;
        }
        this.setState({value: values}, this.mainValidate);
    };

    // validate = () => {
    // };

    render(){
        return(
            <div className="box">
                {this.getComponentTitle()}
                {this.getOptions()}
            </div>
        )
    }
}
