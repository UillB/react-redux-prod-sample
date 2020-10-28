import React, {Component} from "react";

import Vote from "./Voting";
import API from "../../../api/user";


export default class VotingPage extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            vote: {}
        };
    }
    
    componentDidMount(){
        let id = this.props.match.params.id;
        API.getUserVote(id)
            .then(resp => {
                this.setState({vote: resp})
            })
            .catch(error => {
                console.log(error);
            });
    }
    
    
    render(){
        let {title} = this.state.vote;
        return(
            <div className="view-page">
                <div className="view-title">{title}</div>
                {this.state.vote.builder && <Vote list={this.state.vote.builder} vote_id={this.props.match.params.id} history={this.props.history} /> || null}
            </div>
        )
    }
}
