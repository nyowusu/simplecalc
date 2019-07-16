import React from 'react';
import './../assets/button.styles.css';

export function FunctionButton(props){
    return (
        <div className="btn" onClick={(e) => {props.actionClick()}} >
            {props.content}
        </div>
    );
}