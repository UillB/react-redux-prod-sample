import React, {Component} from "react";

import {Button, Icon} from 'antd';

import Radio from "./nodes/radio";
import Checkbox from "./nodes/checkbox";
import Select from "./nodes/select";
import Counter from "./nodes/counter";
import DateTime from "./nodes/DateTime";
import Text from "./nodes/Text";
import Paragraph from "./nodes/Paragraph";
import API_user from "../../../api/user"
import moment from "moment";
const dateFormat = "MMMM Do YYYY, h:mm:ss A";
const ButtonGroup = Button.Group;

const listComponents = {
    "radio": Radio,
    "checkbox": Checkbox,
    "select": Select,
    "counter": Counter,
    "dateTime": DateTime,
    "text": Text,
    "paragraph": Paragraph
};

const resultTypeObject = {
    "radio": 1,
    "checkbox": 2,
    "select": 1,
    "text": 4,
    "paragraph": 4,
    "date": 4,
    "counter": 3,
    "dateTime": 4
};

export default class Voting extends Component {

    state = {
        isValid: false,
        answers: {},
        step: 0
    };

    submit = () => {
        let answers = {};
        Object.keys(this.state.answers).forEach(key => {
            let item = this.state.answers[key];
            if(item.type === "dateTime"){
                answers[key] = moment(item.value).format(dateFormat)
            } else {
                answers[key] = item.value;
            }
        });
        let type_result = {};
        this.props.list.forEach(item => {
            type_result[item.id] = resultTypeObject[item.type];
        });
        let result = {answers, type_result};

        console.log(JSON.stringify(result, 0, 4));
        let vote_id = this.props.vote_id;
        API_user.saveResult(vote_id, result)
            .then(resp => {
                this.props.history.push(`/votes/view/${vote_id}`);
            })
            .catch(error => {
                console.log("Error save result!", error);
            })
    };

    validation = () => {
        for (let i = 0; i < this.props.list.length; i ++) {
            let option = this.state.answers[this.props.list[i].id];
            if (! (option && option.isValid)) {
                return this.setState({isValid: false});
            }
        }
        this.setState({isValid: true});
    };

    setValue = item => {
        this.setState(prevState => ({
                answers: Object.assign({}, prevState.answers, {
                    [item.id]: {
                        value: item.value,
                        isValid: item.isValid,
                        type: item.type
                    }
                })
            }),
            this.validation);
    };

    deleteValue = item => {
        this.setState(prevState => ({
                answers: Object.assign({}, prevState.answers, {
                    [item.id]: {
                        value: item.value, isValid: item.isValid
                    }
                })
            }),
            this.validation);
        console.log("result: ", this.state.answers);
    };
    
    getQuestion = (orderList) => {
        let list = this.props.list;
        if (! (list && list.length)) {
            return "";
        }
        let activeQuestion = list[orderList[this.state.step]],
            TagName = listComponents[activeQuestion.type],
            answer = this.state.answers[activeQuestion.id] && this.state.answers[activeQuestion.id].value || null;
        return <TagName {...activeQuestion} setValue={this.setValue} answer={answer}/>
    };

    getOrderList = () => {
        let list = this.props.list,
            answers = this.state.answers,
            orderList = [];
        if(!list.length){
            return [];
        }

        list.forEach((question, index) => {
            let condition = question.validations;
            if(condition && answers && answers[condition.questionId]){
            let {questionId, optionId, comparator} = condition;
                if(comparator === "=="){
                    if(answers[questionId].value === optionId){
                        orderList.push(index);
                    }
                }
                if(comparator === "!="){
                    if(answers[questionId].value !== optionId){
                        orderList.push(index);
                    }
                }
            } else {
                orderList.push(index);
            }
        });

        return orderList;
    };
    
    prevStep = () => {
        this.setState(prevState => {
            return prevState.step === 0 ? null : {step: prevState.step - 1, lastClickBtn: "prev"}
        })
    };
    
    nextStep = () => {
        this.setState(prevState => {
            return this.props.list.length - 1 === prevState.step ? null : {step: prevState.step + 1, lastClickBtn: "next"}
        })
    };

    render() {
        let {list, isPreview} = this.props;
        let {step} = this.state;
        let orderList = this.getOrderList();
        let questionDom = this.getQuestion(orderList);


        return (
            <div className="view-vote">
                <div className="view-vote-body">
                    {questionDom}
                </div>
                <div className="view-vote-footer">
                    <div className="view-vote-questions-counter">
                        <span>Question {list.length ? this.state.step + 1 : 0} from {list.length}</span>
                    </div>
                    {isPreview ? null : <Button disabled={step !== orderList.length - 1} type="primary" onClick={this.submit} className='view-vote-submit-btn'>
                        Submit
                    </Button>}
                    <div className="view-vote-questions-pointer">
                        <ButtonGroup>
                            <Button disabled={this.state.step === 0} type="primary" id="btn-left"
                                    onClick={this.prevStep}>
                                <Icon type="left"/>
                            </Button>
                            <Button disabled={this.state.step === orderList.length - 1 || list.length === 0} type="primary"
                                    onClick={this.nextStep}>
                                <Icon type="right"/>
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
}
