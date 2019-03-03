import React from 'react';
import classNames from 'classnames';
import './backarrow.css';

class Backarrow extends React.Component {
    render() {
        var arrowClasses = classNames({
            'question-back': true,
            'hidden': this.props.currentQuestion < 1,
        });
         return(
            <div 
                className={arrowClasses}
                onClick = {() => this.props.onClick()}
            >
            </div>
        );
    }
}

export default Backarrow;