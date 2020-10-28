import React, {Component, createRef} from "react";


export default class Input extends Component{
    constructor(props){
        super(props);
        this.node = createRef();
    }

    componentDidMount(){
        this.node.current.focus();
    }

    change = event => {
        let value = event.target.value;
        this.props.change(value);
    };

    render(){
        return <input className="input-edit" type="text" ref={this.node} value={this.props.text} onChange={this.change} />
    }
}