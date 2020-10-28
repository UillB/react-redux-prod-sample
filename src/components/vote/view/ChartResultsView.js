import React, {Component} from "react";

import {PieChart, ResponsiveContainer, Pie, Cell} from "recharts";

export default class ViewVote extends Component {
    
    state = {
        isEvenResult: false
    };
    
    handleWinner = (item) => {
        console.log(item);
    };
    
    render() {
        const RADIAN = Math.PI / 180;
        const COLORS = ['#9C27B0', '#FF5722', '#4CAF50', '#607D8B', '#FBC02D', '#E040FB', '#FF4081', '#5D4037', '#FFEB3B'];
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(- midAngle * RADIAN);
            const y = cy + radius * Math.sin(- midAngle * RADIAN);
            
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };
        let {question_title, question_id, data} = this.props;
        let max = Math.max(...data.map(item => item.value));
        let questionWinners = data.filter((item, index) => {
            item.key = index;
            return item.value == max
        });
        const totalQuestionAnswers = data.reduce((prev, cur) => {return prev + cur.value;}, 0);
        return (
            <div className="result-item">
                <div className="result-body">
                    <div className="result-title"><h1>{question_title}</h1></div>
                    <div className="result-answers">{totalQuestionAnswers} Answers</div>
                    
                    {data.map((item, index) => <div className="result-question-row" key={index}>
                        <div className="result-color" style={{backgroundColor: COLORS[index % COLORS.length]}}/>
                        <div className="result-text">{item.name}</div>
                    </div>)}
                    <div className="result-separator"></div>
                    {questionWinners.map((item) =>
                        <div className="result-question-row" key={item.key}>
                            <div className="result-color" style={{backgroundColor: COLORS[item.key % COLORS.length]}}/>
                            <div className="result-text">
                                <span>
                                    The winner is: <b>{item.name}</b>! The votes count: <b>{item.value}</b>
                                </span>
                            </div>
                        </div>)
                    }
                </div>
                
                <div className="result-chart">
                    <div className="result-chart-inner">
                        <ResponsiveContainer width='100%' aspect={1}>
                            <PieChart key={question_id}>
                                <Pie data={data}
                                     dataKey="value"
                                     label={renderCustomizedLabel}
                                     labelLine={false}
                                     nameKey="name"
                                     fill="#8884d8">
                                    {
                                        data.map((entry, index) => <Cell key={index}
                                                                         onClick={() => {this.handleWinner(entry)}}
                                                                         fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )
    }
}
