import React from 'react';
import { toast } from 'react-toastify';

import styles from './withNotification.module.css';

const withNotification = Component => {
  return props => {
    const options = {
      position: 'bottom-left',
      autoCLose: 4000,
      closeButton: false,
      hideProgressBar: true,
      pauseOnHover: false,
      className: styles.Default,
      bodyClassName: styles.Body,
    };

    const funnyEmojis = [
      '💩',
      '👽',
      '👻',
      '😎',
      '🤗',
      '😊',
      '😻',
      '🥳',
      '🌟',
      '✨',
      '⚡',
      '💥',
      '🔥',
      '🤙',
    ];
    const sadEmojis = [
      '😰',
      '😱',
      '🥵',
      '🥶',
      '🤬',
      '🥺',
      '😷',
      '🤒',
      '🤕',
      '😿',
      '🙀',
      '😭',
    ];

    // Math.floor(Math.random()*items.length)

    const notify = (text, opt = {}) => {
      opt.type = opt.type || 'success';

      switch (opt.type) {
        case 'success':
          text = `${
            funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)]
          } ${text || 'Yeah, that was successfully'}`;
          break;
        case 'fail':
          text = `${
            sadEmojis[Math.floor(Math.random() * sadEmojis.length)]
          } ${text || 'Oops, something went wrong'}`;
          break;
        default:
          break;
      }
      delete opt.type;

      toast(text, { ...options, ...opt });
    };

    return (
      <div>
        <Component {...props} notify={notify} />
      </div>
    );
  };
};

export default withNotification;
