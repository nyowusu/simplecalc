import React from 'react';
import './../assets/button.styles.css'

export function OperatorButton(props) {
    return (
            <div className="btn operator" onClick={(e) => (props.actionClick(props,e))}>
            {props.operator}
        </div>
    );    
}