import React, {Component} from "react";

import UserVote from "./Vote";


export default class UserListVotes extends Component {

    render(){
        return (
            <div className="vote-list-wrapper">
                <h1>Active votes</h1>
                <div className="vote-parent">
                    <UserVote />
                </div>
            </div>
        )
    }
}
