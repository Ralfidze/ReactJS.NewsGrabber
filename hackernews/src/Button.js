import React, { Component } from 'react';
import PropTypes from 'prop-types';
function Button (props) {
        const {
            onClick,
            className,
            children
        } = props;

        return(
            <button 
                onClick={onClick}
                className={className}
                type="button"
            >
            {children}
            </button>
        );
}
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;