import React, {Fragment} from "react";

import DefaultNode from "./DefaultNode";


export default class Checkbox extends DefaultNode {

    changeMin = e => {
        let value = +e.target.value,
            max = this.state.max;
        if(value > -1 && value <= max){
            this.setState({min: value}, this.saveNode);
        }
    };

    changeMax = e => {
        let value = +e.target.value,
            min = this.state.min;
        if(value > -1 && value >= min && value <= this.state.options.length){
            this.setState({max: value}, this.saveNode);
        }
    };

    getBody = () => {
        return <Fragment>
            {this.getOptions()}
        </Fragment>
    };

    // render(){
    //
    //     return(
    //         <div className="question-box" ref={this.node} onClick={this.setActiveNode}>
    //             {this.getTitle()}
    //             {this.getOptions()}
    //             <hr/>
    //             <div>
    //                 <label>
    //                     <span>Min: </span>
    //                     <input type="number" value={this.state.min} onChange={this.changeMin}/>
    //                 </label>
    //             </div>
    //             <div>
    //                 <label>
    //                     <span>Max: </span>
    //                     <input type="number" value={this.state.max} onChange={this.changeMax}/>
    //                 </label>
    //             </div>
    //         </div>
    //     )
    // }
}
