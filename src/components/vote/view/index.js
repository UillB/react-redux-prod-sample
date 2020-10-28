import React, {Component} from "react";

import {Spin} from "antd";

import USER_API from "../../../api/user";
import ChartResultsView from "./ChartResultsView";
import CounterResultsView from "./CounterResultsView";
import ParagraphResultsView from "./ParagraphResultsView";


export default class ViewVote extends Component{

    state = {
      results : [],
        isLoading: true,
        isUseSocket: false
    };

    componentDidMount(){
        this.getDataByApi();
    }

    componentWillUnmount(){
        if(this.state.isUseSocket){
            let vote_id = this.props.match.params.id;
            window.socket.emit('leave_room', vote_id);
            window.socket.off("chart");
        }
    }

    getDataByApi = () => {
        let vote_id = this.props.match.params.id;
        USER_API.getVoteDataAndResult(vote_id)
            .then(resp => {
                let data = {
                    results: {
                        list_1: resp.list_1,
                        list_3: resp.list_3,
                        list_4: resp.list_4
                    },
                    isLoading: false,
                    vote: resp.vote
                };

                let nowDate = + new Date(),
                    dateStart = resp.vote.dateStart,
                    dateEnd = resp.vote.dateEnd;

                if(dateStart && dateEnd && dateStart < nowDate && dateEnd > nowDate){
                    this.setSocket();
                    data.isUseSocket = true;
                }
                this.setState(data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    setSocket = () => {
        let vote_id = this.props.match.params.id;
        window.socket.on("chart", data => {
            console.log("got result");
            vote_id && this.setState({results: data, isLoading: false});
            data.message && console.error(data.message);
        });
        window.socket.emit('room', vote_id);
    };

    render(){
        let {list_1, list_3, list_4} = this.state.results;
        return (
            <div className="vote-results">
                <h1 id="vote-results-header-text">Vote Results</h1>
                {this.state.isLoading ? <Spin tip="Loading" /> : null}

                {!this.state.isLoading && !(list_1 && list_1.length) && !(list_3 && list_3.length) && !(list_4 && list_4.length) && <div>Result is absent for this vote.</div> || null}

                {list_1 && list_1.length &&
                list_1.map(item => <ChartResultsView {...item} key={item.question_id} />) || null}

                {list_3 && list_3.length &&
                list_3.map(item => <CounterResultsView {...item} key={item.question_id} />) || null}

                {list_4 && list_4.length &&
                list_4.map(item => <ParagraphResultsView {...item} key={item.question_id} />) || null}
            </div>
        )
    }
}
