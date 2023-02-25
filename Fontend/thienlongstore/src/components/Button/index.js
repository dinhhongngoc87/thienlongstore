import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Button.module.scss';
const cx = className.bind(styles);
function Button({
    to,
    href,
    primary,
    outline = false,
    disabled = false,
    small = false,
    large = false,
    extraLarge=false,
    text = false,
    rounded,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach((key)=>{
            if(key.startsWith('on')&& typeof props[key] === 'function'){
                delete props[key]
            }
        })
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        extraLarge,
        text,
        disabled,
        rounded,
        [className]:className
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span  className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}

        </Comp>
    );
}
Button.propTypes = {
    children:PropTypes.node
}

export default Button;
