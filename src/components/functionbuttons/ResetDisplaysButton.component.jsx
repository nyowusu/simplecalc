import React from 'react';
import './../assets/button.styles.css';

export function ResetDisplays(props){
    return (
        <div className="btn" onClick={props.clearDisplays}>
            {props.content}
        </div>
    );
}