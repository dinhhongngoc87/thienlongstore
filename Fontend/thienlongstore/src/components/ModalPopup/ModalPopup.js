import styles from './ModalPopup.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';

const cx = classNames.bind(styles);
const ModalPopup = ({ isShowing, toggle,children }) =>
    isShowing
        ? ReactDOM.createPortal(
              <>
                  <div className={cx('modal-overlay')} />
                  <div className={cx('modal-wrapper')} aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div className={cx('modal-header')}>
                          {/* <button
                              type="button"
                              className="modal-close-btn"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={toggle}
                          >
                          </button> */}
                      </div>
                      {children}
                  </div>
              </>,document.body
          )
        : null;
export default ModalPopup;
