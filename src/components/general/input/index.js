import React, {Component} from "react";
import {connect} from 'react-redux';

import Edit from "./Edit"
import {setActiveInput} from "../../../redux/actions/admin";


class Input extends Component{
    render(){
        return this.props.adminReducer.activeInput === this.props.name ?
            <Edit text={this.props.text || ""} change={this.props.change} />
                :
            (<div className="input-view" onClick={() => {this.props.setActiveInput(this.props.name)}}>
                {this.props.text || this.props.defaultText}
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        adminReducer: state.adminReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveInput: name => dispatch(setActiveInput(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Input)