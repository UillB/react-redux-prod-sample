import React, {Component} from "react";
import {connect} from "react-redux";

import {Icon} from "antd";

import Input from "../../../../general/input";
import {setActiveInput} from "../../../../../redux/actions/admin";


class Option extends Component {
    constructor(props){
        super(props);
        this.state = Object.assign({}, {title: ""}, this.props, {isEdit: false});
    }

    changeTitle = value => {
        this.setState({title: value}, this.changeOption);
    };

    removeOption = () => {
        this.props.removeOption(this.state.id);
    };

    changeOption = () => {
        let {id, title} = this.state;
        this.props.changeOption(id, title);
    };

    getBody = () => {
        if(this.props.adminReducer.activeInput === this.props.identificator){
            return <Input text={this.state.title} change={this.changeTitle} name={this.props.identificator}/>
        } else {
            return <div className="input-view">{this.state.title}</div>
        }

    };

    render() {
        // return this.props.adminReducer.activeInput === this.props.identificator ? this.getEditingView() : this.getLookingView();
        return (
            <div className="option" onClick={()=>this.props.setActiveInput(this.props.identificator)}>
                <div>{this.props.index}. </div>
                {this.getBody()}
                <Icon type="delete" onClick={this.removeOption} style={{cursor: "pointer"}}/>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Option)