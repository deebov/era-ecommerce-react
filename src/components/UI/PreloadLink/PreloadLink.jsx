import React from 'react';
import { withRouter } from 'react-router-dom';

const PreloadLink = ({ to, waiting, history, children, className, title }) => {
  const onClickHandler = async e => {
    e.preventDefault();
    await waiting();
    history.push(to);
  };
  return (
    <a href={to} onClick={onClickHandler} title={title} className={className}>
      {children}
    </a>
  );
};

export default withRouter(PreloadLink);
