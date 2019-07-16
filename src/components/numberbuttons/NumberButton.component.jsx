import React from 'react';
import './../assets/button.styles.css';
 
export function NumberButton(props) {
    return (
        <div className="btn" onClick={(e) => props.appendNumber(props, e)}>
            {props.number}
        </div>
    );
}