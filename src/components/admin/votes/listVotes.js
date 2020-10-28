import React, {Component} from "react";

import Vote from "./Vote";


export default class ListVotes extends Component {
    
    render(){
        return (
            <div className="vote-list-wrapper">
                <h1>Active votes</h1>
                <div className="vote-parent">
                    <Vote />
                </div>
            </div>
        )
    }
}
