import React, {Component} from "react";
import {each, groupBy, maxBy} from 'lodash';
import {Table} from 'antd';

export default class ViewVote extends Component {
    
    render() {
        let {question_title, data} = this.props;
        const columns = [
            { title: 'User name', dataIndex: 'login', width: 200, key: 'login'},
            { title: 'User Answer', dataIndex: 'value', key: 'value'},
        ];
        return (
            <div className="result-item-counter">
                <div className="result-item-t">{question_title}</div>
                <Table
                   columns={columns}
                   pagination={false}
                   dataSource={data}
                   rowKey="login"
                />
            </div>
        )
    }
}
