import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const LinkButton = (props) => {
  const { children, ...btnProps } = props;
  return (
    <button className="LinkButton" {...btnProps}>
      {children}
    </button>
  );
};

LinkButton.propTypes = propTypes;

export default LinkButton;
