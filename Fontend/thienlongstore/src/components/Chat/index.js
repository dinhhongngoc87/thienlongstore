import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { Check, PaperPlaneIcon } from '../Icons';
import { connect } from 'react-redux';
import { setOpenChat } from '../../store/actions/chartActions';
import { useRef, useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../context/SocketProvider';

const cx = classNames.bind(styles);
function Chat(props) {
    const input = useRef();
    const [message, setMessage] = useState('');
    const socket = useContext(SocketContext);
    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message) {
            const messageData = {
                author: `${props.userInfo.firstName} ${props.userInfo.lastName}`,
                room: props.userInfo.id,
                message: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send_message', messageData);
            socket.on('receive_message', (data) => {
                console.log(data);
            });
            setMessage('');
            input.current.focus();
        }
    };

    useEffect(() => {}, [socket]);
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <span>
                        <img
                            alt="avatar"
                            src="https://scontent.fsgn13-4.fna.fbcdn.net/v/t39.30808-1/338340694_234033915816005_7981910565534082278_n.jpg?stp=c191.191.1666.1666a_cp0_dst-jpg_s74x74&_nc_cat=1&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=IizyikVqA5gAX_MKoee&_nc_ht=scontent.fsgn13-4.fna&edm=AJo6ZFEEAAAA&oh=00_AfBqgA-Gyyu4cX1jhK2fQn-OnUvzQ_x-gVx8ZO7y5KLpOA&oe=6446E331"
                        ></img>
                        <span>Thiên Long shop</span>
                    </span>
                    <button
                        className={cx('close-btn')}
                        onClick={() => {
                            props.setOpenChat();
                        }}
                    >
                        X
                    </button>
                </div>
                <div className={cx('body')}></div>
                <div className={cx('footer')}>
                    <form id={cx('send-container')}>
                        <input
                            ref={input}
                            type="text"
                            value={message}
                            onChange={handleChangeMessage}
                            placeholder="Bạn hỏi gì đi..."
                        />
                        <button onClick={sendMessage}>
                            <PaperPlaneIcon className={cx('send-icon', message ? 'active' : null)} />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        isOpenChat: state.chat.isOpenChat,
        userInfo: state.user.userInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setOpenChat: () => {
            dispatch(setOpenChat());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
