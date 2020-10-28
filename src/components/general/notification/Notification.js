import React, {Component} from "react"
import {connect} from "react-redux";
import {closeNotification} from "../../../redux/actions/notifications";


class Notification extends Component {
    
    closeNotification = (element) => {
        this.props.closeNotification(element);
    };
    
    render(){
        let notificationMessages = this.props.notificationsReducer.notificationMessages;
        if(notificationMessages.length){
            return(
                <ul className="notification-wrapper">
                    {notificationMessages.map((elem, index) => {
                        return <li key={index} className="notification">{elem.notificationMessage} <span className="notification-close" onClick={() => this.closeNotification(elem)}>X</span></li>
                    })}
                </ul>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        notificationsReducer: state.notificationsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeNotification: data => dispatch(closeNotification(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
