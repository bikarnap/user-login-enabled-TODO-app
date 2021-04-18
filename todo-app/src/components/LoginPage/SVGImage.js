import React from 'react';
import logo from './logo.svg';

const SVGImage = () => {
    return(
        <div className="svg-image">
            <img style={{width: '100%'}} src={logo} alt="" />
        </div>
    );
};

export default SVGImage;