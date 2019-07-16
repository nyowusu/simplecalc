import React from 'react';
import './../assets/button.styles.css';

export function NegativePositive(props){
    return (
        <div className="btn" onClick={props.setSign}>
            {props.content}
        </div>
    );
}