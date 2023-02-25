import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types'
import styles from './AcountItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);
function AccountItem({data}) {
    return (
        <Link to = {`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt = {data.full_name} />
            <div className={cx('infor')}>
                <p className={cx('name')}>
                    <span>{data.full_name} &nbsp;</span>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>}
                </p>
                <span className={cx('username')}>{data.nickname}</span>
            </div>
        </Link>
        
    );
}

AccountItem.propTypes = {
    data: PropTypes.object
}

export default AccountItem;
