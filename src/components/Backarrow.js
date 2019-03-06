import React from 'react';
import classNames from 'classnames';
import './backarrow.css';

class Backarrow extends React.Component {
    render() {
        var arrowClasses = classNames({
            'question-back': true,
            'hidden': this.props.hidden,
        });
         return(
            <div 
                className={arrowClasses}
                onClick = {() => this.props.onClick()}
            >
                <img src='./images/icons/back-arrow.svg' alt="back" width="25" height="40" />
            </div>
        );
    }
}

export default Backarrow;