import React from 'react';
import './../assets/Display.styles.css'

export function DisplayMain(props) {
    return (
        <div className="display display-main">
            {props.values}
        </div>
    );
}

