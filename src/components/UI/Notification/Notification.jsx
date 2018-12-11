import React from 'react';
import withNotification from '../../../hoc/withNotification/withNotification';

const Notification = ({show, text = null, onOpen, onClose, options, notify}) => {
  return (
    <div>{show ? notify(text, { ...options, onOpen, onClose }) : null}</div>
  );
};

export default withNotification(Notification);
