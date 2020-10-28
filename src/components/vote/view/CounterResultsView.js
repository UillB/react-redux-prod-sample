import React, {Component} from "react";
import {each, groupBy, maxBy} from 'lodash';
import {Table} from 'antd';

export default class ViewVote extends Component {
    
    state = {
        isEvenResult: false
    };
    
    getData(data = this.props.data) {
        const grouped = groupBy(data, 'login');
        const newData = [];
        each(grouped, (items, user) => {
            const newItem = {user};
            items.map(item => ({
                title: item.option_title,
                value: +item.value
            })).forEach(item => newItem[item.title] = item.value);
            newData.push(newItem);
        });
        
        return newData;
    }
    
    getColumnsFromData(data) {
        const maxItem = maxBy(data, item => Object.keys(item).length);
        const columns = [{title: 'User name', dataIndex: 'user'}];
        
        each(maxItem, (value, key) => {
            if (key === 'user') return;
            columns.push({title: key, dataIndex: key});
        });
        return columns;
    }
    
    render() {
        const data = this.getData();
        const columns = this.getColumnsFromData(data);
        return (
            <div className="result-item-counter">
                <div className="result-item-t">{this.props.question_title}</div>
                <Table
                   columns={columns}
                   pagination={false}
                   dataSource={data}
                   rowKey="user"
                />
            </div>
        )
    }
}
