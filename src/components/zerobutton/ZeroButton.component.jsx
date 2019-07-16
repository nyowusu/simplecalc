import React from 'react';
import './../assets/button.styles.css';

export function ZeroButton(props) {
    return (
        <div className="btn col-2" onClick={(e)=>{props.appendNumber(props, e)}}>
            {props.number}
        </div>
    );
}