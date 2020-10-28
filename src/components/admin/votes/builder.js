import React, {Component} from "react";
import {connect} from 'react-redux';

import {DatePicker, Select, Icon, Button, message, notification} from 'antd';
const {RangePicker} = DatePicker;
const {Option} = Select;
import moment from 'moment';

import NodeCheckbox from "./nodes/checkbox";
import NodeRadio from "./nodes/radio";
import NodeSelect from "./nodes/select";
import NodeCounter from "./nodes/counter";
import NodeText from "./nodes/Text";
import NodeParagraph from "./nodes/Paragraph";
import NodeDateTime from "./nodes/DateTime";

import Vote from "../../vote/voting/Voting";
import defaultValuesNodes from "./nodes/defaultValuesNodes";
import Input from "../../general/input"
import API from "../../../api/admin";
import {saveVote} from "../../../redux/actions/votes";
import {getGroups, setActiveInput} from "../../../redux/actions/admin";
import {sendNotification} from "../../../redux/actions/notifications";


const listComponents = {
    "radio": NodeRadio,
    "checkbox": NodeCheckbox,
    "select": NodeSelect,
    "counter": NodeCounter,
    "text": NodeText,
    "paragraph": NodeParagraph,
    "dateTime": NodeDateTime
};


const componentWithOptions = {
    "radio": true,
    "checkbox": true,
    "select": true,
    "counter": true
};


class Builder extends Component {

    initState = {
        title: "",
        description: "",
        builder: [],
        dateStart: "",
        dateEnd: "",
        isPublish: false,
        activeQuestion: 0,
        toolsTop: 0,
        group_list: [],
        isShowPreview: false,
        isShowGenSet: false
    };

    state = {...this.initState};

    componentDidMount(){
        let id = this.props.match.params.id;
        if (id === "new") {
            this.addNodeByBackEnd("radio");
        } else {
            API.getVote(id)
                .then(resp => {
                    if(resp.group_list && resp.group_list.length){
                        resp.group_list = resp.group_list.split(",")
                    } else {
                        resp.group_list = [];
                    }
                    this.setState({...resp});
                })
                .catch(error => {
                    console.log(error);
                });
        }
        this.props.getGroups();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.setState({...this.initState});
        }
    }

    addNode = type => {//deprecated
        return () => {
            let newItem = {...defaultValuesNodes[type]};
            newItem.id = this.generateId();
            newItem.type = type;
            newItem.isAutoCreating = true;
            this.setState(prevState => ({
                builder: prevState.builder.concat(newItem),
                activeQuestion: prevState.builder.length
            }));
        }
    };

    addNodeByBackEnd = type => {
        API.createQuestionId()
            .then(id => {
                let newItem = {...defaultValuesNodes[type]};
                newItem.id = id;
                newItem.type = type;
                newItem.isAutoCreating = true;
                this.setState(prevState => ({
                    builder: prevState.builder.concat(newItem),
                    activeQuestion: prevState.builder.length
                }));
            })
            .catch(error => {
                console.log(error);
            })
    };

    saveVote = () => {
        if (!this.state.title) {
            return message.error('Please enter the vote title.');
        }
        // if (!this.state.dateStart || !this.state.dateEnd) {
        //     message.error('Please enter the vote date');
        //     return;
        // }
        let isError = false;
        this.state.builder.forEach((item, index) => {
            if(!item.title){
                message.error(`Question '${item.title || `Question ${index + 1}`}' should have title!`);
                isError = true;
            }
            if (componentWithOptions[item.type]) {
                if(!item.options.length){
                    message.error(`Question '${item.title || `Question ${index + 1}`}' should have not less one option!`);
                    isError = true;
                }
            }
        });
        if(isError){
            return;
        }
        let id = this.props.match.params.id;
        let data = this.state;
        if (id === "new") {
            API.createVote(data)
                .then(() => {
                    this.props.history.push('/votes/');
                    this.openNotification('success', 'The Vote has been saved', `The Vote "${this.state.title}" has been successfully saved.`, 5);
                })
                .catch(error => {
                    console.log(error);
                })

        } else {
            API.updateVote(data)
                .then(() => {
                    this.props.history.push('/votes/');
                    this.openNotification('success', 'The Vote has been edited', `The Vote "${this.state.title}" has been successfully edited.`, 5);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    openNotification = (type, msg, description, time) => {
        notification.config({
            duration: time
        });
        notification[type]({
            message: msg,
            description: description,
        });
    };

    cancelVote = () => {
        this.props.history.push('/votes');
    };

    changeNode = (id, data) => {
        this.setState(prevState => ({
            builder: prevState.builder.map(item => {
                if (item.id === id) {
                    // item = Object.assign({}, item, data);
                    item = this.copyObject(data);
                }
                return item;
            })
        }));
    };

    removeNode = question_index => {
        this.setState(prevState => {
            let orderObj = {};
            if (prevState.builder.length > 1) {
                if (prevState.activeQuestion === prevState.builder.length - 1) {
                    orderObj.activeQuestion = prevState.activeQuestion - 1;
                }
            } else {
                orderObj.toolsTop = 0;
                orderObj.activeQuestion = null;
            }
            return {builder: prevState.builder.filter((item, index) => {
                if(question_index === index){
                    API.deleteQuestionId(item.id)
                        .catch(console.log);
                    return false;
                } else {
                    return true;
                }
            }), ...orderObj}
        });
        this.props.setActiveInput(null);
    };

    copyObject = obj => {
        if (obj) {
            let arr = JSON.stringify(obj);
            return JSON.parse(arr);
        } else {
            return {};
        }
    };

    generateId = () => {
        let id = '_' + Math.random().toString(36).substr(2, 9);
        return id;
    };

    changeDate = (date, dateString) => {
        this.setState({
            dateStart: moment(date[0]).startOf('day').valueOf(),
            dateEnd: moment(date[1]).endOf('day').valueOf()
        })
    };

    getGroupOptions = () => {
        return this.props.adminReducer.groupsList && this.props.adminReducer.groupsList.length && this.props.adminReducer.groupsList.map(item => <Option key={item}>{item}</Option>);
    };

    setActiveQuestion = (data = {}) => {
        this.setState({activeQuestion: data.activeQuestion, toolsTop: data.top || 0})
    };

    setPrevQuestion = () => {
        this.setState(prevState => (prevState.activeQuestion === 0 ? null : {activeQuestion: prevState.activeQuestion - 1}));
    };

    setNextQuestion = () => {
        this.setState(prevState => (prevState.builder.length - 1 === prevState.activeQuestion ? null : {activeQuestion: prevState.activeQuestion + 1}));
    };

    setGroups = groups => {
      this.setState({group_list: groups});
    };

    render() {
        if (!this.state) {
            return <h1>This vote is absent!</h1>
        }
        let {builder, activeQuestion} = this.state;
        let toolsIconStyle = {cursor: "pointer"};
        let isCreating = this.props.match.params.id === "new";

        return (
            <div className="builder-container">
                <div className="builder-title">{isCreating ? <h1>Vote creating</h1> : <h1>Vote editing</h1>}</div>
                {/*<div className="breadcrumb">*/}
                {/*<Link to={"/admin/votes"}>{"< List of votes"}</Link>*/}
                {/*</div>*/}

                {/*<div className="builder-title-box">*/}
                {/*<span className={isShowPreview ? "" : " active"}  onClick={()=>this.setState({isShowPreview: false})}>Builder</span>*/}
                {/*<span className={isShowPreview ? " active" : ""}  onClick={()=>this.setState({isShowPreview: true})}>Preview</span>*/}
                {/*</div>*/}

                {this.state.isShowPreview ? <Vote list={builder}/> :
                    <div className="builder-body">
                        <div className="builder-constructor">

                            <div className={"builder-tools"} style={{top: `${this.state.toolsTop}px`}}>
                                <div className="builder-tools-item">
                                    <Icon type="plus-circle" style={toolsIconStyle} onClick={()=>this.addNodeByBackEnd("radio")}/>
                                    {builder.length && activeQuestion !== null ?
                                        <Icon type="delete" style={toolsIconStyle}
                                              onClick={() => this.removeNode(this.state.activeQuestion)}/> : null}
                                    {builder.length && activeQuestion !== null ?
                                        <Icon type="copy" style={toolsIconStyle}/> : null}
                                </div>
                                {builder.length && activeQuestion !== null ?
                                    <div className="builder-tools-item" style={{top: `${this.state.toolsTop}px`}}>
                                        <Icon type="arrow-up" style={toolsIconStyle} onClick={this.setPrevQuestion}/>
                                        <Icon type="arrow-down" style={toolsIconStyle} onClick={this.setNextQuestion}/>
                                    </div> : null}
                            </div>

                            <div className="builder-gen-setting" style={{
                                borderBottom: 0,
                                marginBottom: 0,
                                paddingBottom: "1px",
                                position: "sticky",
                                top: 0,
                                left: 0,
                                right: 0,
                                zIndex: 999
                            }}>
                                <label className="form-text-box">
                                    <div className="input-title">Title</div>
                                    <Input text={this.state.title} change={val => {
                                        this.setState({title: val})
                                    }} name="title"/>
                                </label>
                            </div>


                            <div className="builder-gen-setting" style={{borderTop: 0, paddingTop: 0}}>
                                <label className="form-text-box">
                                    <div className="input-title">Description</div>
                                    <Input text={this.state.description} change={val => {
                                        this.setState({description: val})
                                    }} name="description"/>
                                </label>

                                <label className="form-text-box">
                                    <div className="input-title">Period</div>
                                    <RangePicker onChange={this.changeDate}
                                                 size="large"
                                                 value={this.state.dateStart ? [moment(this.state.dateStart), moment(this.state.dateEnd)] : null}
                                                 disabledDate={current => current && current < moment().startOf('day')}
                                                 style={{width: '100%'}}/>
                                </label>

                                <label className="form-text-box">
                                    <div className="input-title">Groups</div>
                                        <Select mode="multiple"
                                                style={{width: '100%'}}
                                                placeholder="Please select"
                                                size="large"
                                                onChange={this.setGroups}
                                                value={this.state.group_list}
                                        >
                                        {this.getGroupOptions()}
                                    </Select>
                                </label>

                                {/*<label className="form-text-box">*/}
                                {/*<div className="input-title">List of voters</div>*/}
                                {/*<Select*/}
                                {/*mode="multiple"*/}
                                {/*style={{width: '100%'}}*/}
                                {/*placeholder="Please select"*/}
                                {/*size="large"*/}
                                {/*//onChange={handleChange}*/}
                                {/*>*/}
                                {/*{this.getUserOption()}*/}
                                {/*</Select>*/}
                                {/*</label>*/}

                            </div>


                            {builder && builder.length && builder.map((item, index) => {
                                let TagName = listComponents[item.type];
                                return <TagName key={item.id} {...item}
                                                index={index}
                                                changeNode={this.changeNode}
                                                removeNode={this.removeNode}
                                                setActiveQuestion={this.setActiveQuestion}
                                                setActiveInput={this.props.setActiveInput}
                                                activeQuestion={this.state.activeQuestion}
                                                builder={builder}
                                />
                            }) || null}

                            <div className="builder-empty"/>

                            <div className="builder-footer-btn">
                                {/*<label className="builder-publish">*/}
                                {/*<input type="checkbox" checked={this.state.isPublish} onChange={()=>{this.setState(prevState=>({isPublish: !prevState.isPublish}))}}/>*/}
                                {/*<span>Publish after save</span>*/}
                                {/*</label>*/}
                                <Button type="primary" onClick={this.saveVote}>
                                    Save
                                </Button>
                                <Button type="default" onClick={this.cancelVote}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        <div className="builder-preview">
                            <div className="live-preview">
                                <span>Live Preview</span>
                            </div>
                            {/*<div className="vote-preview">*/}
                            <Vote list={builder} vote_id={this.props.match.params.id} isPreview={true}/>
                            {/*</div>*/}

                        </div>
                    </div>
                }
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
        saveVote: (id, data, cb) => dispatch(saveVote(id, data, cb)),
        getGroups: () => dispatch(getGroups()),
        setActiveInput: name => dispatch(setActiveInput(name)),
        sendNotification: (data) => dispatch(sendNotification(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder)
