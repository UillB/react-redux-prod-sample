import React from "react";

import moment from "moment";
import {DatePicker, TimePicker} from "antd";

import Default from "./default";


export default class DateTime extends Default {

    changeDate = date => {
        let value = moment(this.state.value);
        value = value.year(moment(date).year())
                        .month(moment(date).month())
                        .day(moment(date).day())
                        .valueOf();
        this.setState({value}, this.mainValidate);
    };

    changeTime = time => {
        let value = moment(this.state.value);
        value = value.hours(moment(time).hour())
                        .minutes(moment(time).minute())
                        .valueOf();
        this.setState({value}, this.mainValidate);
    };


    render(){

        return(
            <div className="box">
                {this.getComponentTitle()}
                <div>
                    <DatePicker onChange={this.changeDate} value={moment(this.state.value)} style={{marginRight: "5px"}} />

                    <TimePicker onChange={this.changeTime} value={moment(this.state.value)}  format="h:mm a" />
                </div>

            </div>
        )
    }
}

