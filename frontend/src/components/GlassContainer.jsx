import React from 'react';

const GlassContainer = ({ children, className = '', ...props }) => {
    return (
        <div 
            className={`bg-white/60 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassContainer;
