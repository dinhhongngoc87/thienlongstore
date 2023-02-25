import { forwardRef, useState } from 'react';
import images from '../../asset/images';
import className from 'classnames/bind';
import styles from './Image.module.scss'

const cx = className.bind(styles)
//fallback:customFallback syntax change name of ref in es6
const Image = forwardRef(({ src, alt,className,fallback:customFallback = images.noImage, ...props }, ref) => {
    const [fallback,setFallback] = useState('')
    const handleError = () =>{
        setFallback(customFallback)
    }
    return <img className={cx(styles.wrapper,className)} ref={ref} src={fallback||src} alt={alt} {...props} onError={handleError} />;
});

export default Image;
