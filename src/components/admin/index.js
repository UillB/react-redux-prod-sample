import React, {Component} from "react"
import {Link} from "react-router-dom"


export default class Admin extends Component {

    render(){
        return(
            <div>
                <h1>Adminka</h1>
                <div>
                    <Link to={`/votes`}>List of votes</Link>
                    <br/>
                    <Link to={`/users`}>List of users</Link>
                </div>
            </div>
        )
    }
}