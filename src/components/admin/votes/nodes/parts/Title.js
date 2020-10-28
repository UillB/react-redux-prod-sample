import React, {Component} from "react";

import {Table, Switch, Button, Modal, notification, Select, Menu, Dropdown, Icon} from 'antd';
const {Option} = Select;

import Input from "../../../../general/input";


export default class Title extends Component {
    constructor(props){
        super(props);

        this.state = {
            visibleConditionModal: false
        };
        let validations = this.props.validations;
        if(validations){
            this.state.selectedQuestion = validations.questionId;
            this.state.selectedOption = validations.optionId;
            this.state.selectedComparator = validations.comparator;
        }
    }


    setCurrentUser = () => {
        this.setState({visibleConditionModal: true});
        console.log(this.state);
    };

    questionMenu = () => {
        const listQuestions = this.props.builder.slice(0, this.props.index);
        const questionMenu = listQuestions.map(item => <Option key={item.id} value={item.id}>{item.title || `Question ${item.index}`}</Option>);
        return questionMenu;
    };

    optionMenu = () => {
        if(!this.state.selectedQuestion){
            return [];
        }
        let question = this.props.builder.filter(item => item.id == this.state.selectedQuestion)[0];
        if(!question || !question.options){
            console.log("option is absent", question);
            return [];
        }
        const optionList = question.options;
        if(!optionList.length){
            return [];
        }
        const optionMenu = optionList.map(item => <Option key={item.id} value={item.id}>{item.title || `Option ${item.index}`}</Option>);
        return optionMenu;
    };

    comparatorMenu = () => {
        return [
            <Option key={0} value={"=="}>equal</Option>,
            <Option key={1} value={"!="}>not equal</Option>
        ]
    };

    changeQuestion = question => {
        this.setState({selectedQuestion: question, selectedOption: null});
    };

    changeOption = option => {
        this.setState({selectedOption: option});
    };

    changeComparator = comparator => {
        this.setState({selectedComparator: comparator});
    };

    handleConditionModalOk = () => {
        let {selectedQuestion, selectedComparator, selectedOption} = this.state;
        let validations = {
            questionId: selectedQuestion,
            optionId: selectedOption,
            comparator: selectedComparator
        };
        this.props.changeValidation(validations);
        this.setState({
            visibleConditionModal: false
        });
    };

    handleConditionModalCancel = () => {
        let validations = this.props.validations || {};
        this.setState({
            visibleConditionModal: false,
            selectedQuestion: validations.questionId || null,
            selectedOption: validations.optionId || null,
            selectedComparator: validations.comparator || null
        });
        this.props.changeValidation(null);
    };

    handleConditionModalReset = () => {
        this.setState({
            selectedQuestion: null,
            selectedOption: null,
            selectedComparator: null
        })
    };

    render(){
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.setCurrentUser}>Manage condition</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div className="question-title">Question {this.props.index + 1}</div>
                {this.props.index !== 0 ? <div className="question-menu">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            <Icon type="ellipsis" className="vertical-ellipsis-icon" />
                        </a>
                    </Dropdown>
                </div> : null}
                <Input text={this.props.title} defaultText={"Title"} change={this.props.changeName} name={this.props.id}/>
                <div className="question-br" />
                <Select labelInValue
                        value={{key: this.props.type}}
                        defaultValue={{key: 'radio'}}
                        style={{width: "100%"}}
                        size="large"
                        onChange={this.props.changeType}
                >
                    <Option value="radio">Radio</Option>
                    <Option value="checkbox">Checkboxes</Option>
                    <Option value="select">Dropdown</Option>
                    <Option value="counter">Counter</Option>
                    <Option value="text">Short answer</Option>
                    <Option value="paragraph">Paragraph</Option>
                    <Option value="dateTime">Date/Time</Option>
                </Select>
                <div className="question-br" />

                {this.state.visibleConditionModal ? <Modal title={`Please select the condition for visibility`}
                       visible={this.state.visibleConditionModal}
                       //onOk={this.handleConditionModalOk}
                       //confirmLoading={this.state.confirmLoading}
                       //onCancel={this.handleConditionModalCancel}
                       footer={[
                           <Button key="reset" onClick={this.handleConditionModalReset}>Reset</Button>,
                           <Button key="back" onClick={this.handleConditionModalCancel}>Cancel</Button>,
                           <Button key="submit" type="primary" onClick={this.handleConditionModalOk}>OK</Button>,
                       ]}
                >

                    <div>Select question</div>
                    <Select
                        style={{ width: 200 }}
                        defaultActiveFirstOption={true}
                        onChange={this.changeQuestion}
                        value={this.state.selectedQuestion}
                    >
                        {this.questionMenu()}
                    </Select>

                    <div>Select comparator</div>
                    <Select
                        style={{ width: 200 }}
                        defaultActiveFirstOption={true}
                        onChange={this.changeComparator}
                        value={this.state.selectedComparator}
                    >
                        {this.comparatorMenu()}
                    </Select>

                    <div>Select option</div>
                    <Select
                        style={{ width: 200 }}
                        defaultActiveFirstOption={true}
                        disabled={!this.state.selectedQuestion}
                        onChange={this.changeOption}
                        value={this.state.selectedOption}
                    >
                        {this.optionMenu()}
                    </Select>


                </Modal> : null}
            </div>
        )}
}
