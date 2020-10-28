import React, {Component, createRef} from "react"

import Option from "./parts/Option"
import Title from "./parts/Title"


export default class DefaultNode extends Component {
    constructor(props){
        super(props);

        this.state = this.props;
        this.node = createRef();
    }

    componentDidMount() {
        if(this.props.activeQuestion === this.props.index){
            this.setActiveNode();
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.activeQuestion !== prevProps.activeQuestion && this.props.activeQuestion === this.props.index){
            this.setActiveNode();
        }
    }

    generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    saveNode = () => {
        this.props.changeNode(this.state.id, this.state);
    };

    addOption = () => {
        let newItem = {
            id: this.generateId(),
            title: "",
            question_id: this.state.id
        };
        this.setState(prevState => ({options: prevState.options ? prevState.options.concat(newItem) : [newItem]}), this.saveNode);
        let identificator = `${this.props.id}_${newItem.id}`;
        this.props.setActiveInput(identificator);
    };

    removeOption = id => {
        this.setState(prevState => ({options: prevState.options.filter(item => item.id !== id)}), this.saveNode);
    };

    changeOption = (id, title) => {
        this.setState(prevState => ({
            options: prevState.options.map(item => {
                if(item.id === id){
                    item.title = title;
                }
                return item;
            })
        }), this.saveNode)
    };

    changeName = val => {
        this.setState({title: val}, this.saveNode);
    };

    changeType = val => {
        this.setState({type: val.key}, this.saveNode);
    };

    getTitle = () => {
        return <Title changeType={this.changeType}
                      changeName={this.changeName}
                      changeValidation={this.changeValidation}
                      {...this.props}
        />
    };

    getOptions = () => {
        let options = this.state.options || [];
        let list = options.map((item, index) => <Option key={item.id} {...item}
                                                        identificator={`${this.props.id}_${item.id}`}
                                                        removeOption={this.removeOption}
                                                        changeOption={this.changeOption}
                                                        index={index + 1}/>) || "";

        list.push(<div key="last" className="option" style={{opacity: "0.5"}} onClick={this.addOption}>
                        <div>{list.length + 1}.</div>
                        <div className="input-view">Add option</div>
                    </div>);
        return list;

    };

    setActiveNode = () => {
      let top = this.node.current.offsetTop,
          id = this.props.index;
      this.props.setActiveQuestion({activeQuestion: id, top});
    };

    getBody = () => <div>Default</div>;

    changeValidation = validations => {
        this.setState({validations}, this.saveNode);
    };

    render(){
        return(
            <div className={"question-box" + (this.props.index === this.props.activeQuestion ? " active" : "")} ref={this.node} onClick={this.setActiveNode}>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }
}