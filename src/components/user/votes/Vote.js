import React, {Component} from "react";
import {connect} from "react-redux";

import {getUserVotes} from "../../../redux/actions/votes";
import { Button, Menu } from 'antd';
import moment from "moment";
import {Link} from "react-router-dom"


class UserVote extends Component {

    componentDidMount(){
        this.props.getUserVotes();
    }
    
    getLinks = () => {
        let votes = this.props.votes;
        const dateFormat = "DD.MM.YYYY";

        return votes.map(item => {
            let dateNow = + new Date();
            let isActiveVote = item.dateStart < dateNow && item.dateEnd > dateNow;
            let isArchive = item.dateEnd < dateNow;
            let isPased = item.answersCount > 0;
            return (
                <div className="vote-child" key={item.id}>
                    <h1>{item.title}</h1>
                    <div className="vote-author">Created by: {item.userLogin}</div>
                    <div className="vote-content-separator"></div>
                    <div className="vote-details">
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">ID:</div>
                            <div className="vote-detail-info">{item.id}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Questions quantity:</div>
                            <div className="vote-detail-info">{item.questionCount}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Description:</div>
                            <div className="vote-detail-info">{item.description}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Created at:</div>
                            <div className="vote-detail-info">{moment(item.dateCreate).format(dateFormat)}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Time frame:</div>
                            <div className="vote-detail-info">{`${moment(item.dateStart).format(dateFormat)} - ${moment(item.dateEnd).format(dateFormat)}`}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Status:</div>
                            <div className="vote-detail-info">{(isPased ? "passed" : "not passed") + (isActiveVote ? ", active" : ", no active")}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Groups:</div>
                            <div className="vote-detail-info">{item.concatenated || "-"}</div>
                        </div>
                    </div>
                    {!isArchive && !isActiveVote && <Button disabled={true} type="primary" className="vote-submit-btn">
                        <Link to={`/votes/edit/${item.id}`}>This vote will start on {moment(item.dateStart).format(dateFormat)}</Link></Button> || null}
                    {isActiveVote && !isPased &&  <Button type="primary" className="vote-submit-btn">
                        <Link to={`/votes/vote/${item.id}`}>Vote</Link></Button> || null}
                    {(isPased || isArchive) &&  <Button type="primary" className="vote-submit-btn">
                        <Link to={`/votes/view/${item.id}`}>View results</Link></Button> || null}
                </div>
            )
        });
    };
    
    render(){
        return this.props.votes.length ? this.getLinks() : <div className="info-text">List is empty</div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        votes: state.votesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserVotes: () => dispatch(getUserVotes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserVote)
