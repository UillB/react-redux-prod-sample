import React, {Component} from "react";

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate,
} from 'antd';

const FormItem = Form.Item;


class Option extends Component {

    state = {
        value: this.props.value
    };

    saveOption = () => {
        this.props.setOption(this.props.id, this.state.value);
    };

    change = e => {
        let value = e;
        if(value < 0){
            return;
        }
        this.setState({value}, this.saveOption);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        return (
            <div>
                <Form>
                    <FormItem
                        label={this.props.title}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('input-number', { initialValue: this.state.value })(
                            <InputNumber min={0} max={150} onChange={this.change}/>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedCounter = Form.create()(Option);
export default WrappedCounter;
