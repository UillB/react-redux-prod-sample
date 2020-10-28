import React, {Component} from "react";

import moment from "moment"


export default class Default extends Component {

    getState = () => {
        switch (this.props.type){
            case "radio":
                if(this.props.options && this.props.options.length){
                    return this.props.options[0].id
                } else {
                    return null;
                }
            case "select":
                return null;
            case "checkbox":
                return [];
            case "counter":
                return {};
            case "dateTime":
                return moment().valueOf();
            default :
                return "";
        }
    };

    checkTypeAnswer = () => {
        let {answer, type} = this.props;
        switch (type){
            case "radio":
            case "select":
                return Number.isInteger(answer);
            case "dateTime":
                return Number.isInteger(answer) && answer.toString().length === 13;
            case "checkbox":
               return Array.isArray(answer);
            case "counter":
                return typeof answer === "object" && !Array.isArray(answer);
            default :
                return typeof answer === "string";
        }
    };

    initState = () => ({
        value: this.props.answer && this.checkTypeAnswer() && this.props.answer || this.getState()
    });

    state = this.initState();

    componentDidMount(){
        this.mainValidate();
    }

    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.setState({...this.initState()}, this.mainValidate);
        }
        if(prevProps.type !== this.props.type){
            this.setState({...this.initState()}, this.mainValidate);
        }
    }

    mainValidate = () => {
        let data = {
            id: this.props.id,
            value: this.state.value,
            isValid: this.validate ? this.validate() : !!this.state.value,
            type: this.props.type
        };
        this.props.setValue(data);
    };
    
    getComponentTitle = () => {
        return <div className="view-question-title">{this.props.title}</div>
    };

    render(){
        return(
            <div>
                default
            </div>
        )
    }
}
