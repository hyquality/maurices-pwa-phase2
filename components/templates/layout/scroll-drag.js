import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

export default function ScrollDrag({rootClass,children, ...props}) {
    const ref = useRef(null);
    const [clientX,setClientX] = useState(0)
    const [scrollX,setScrollX] = useState(0)
    const [isScrolling,setIsScrolling] = useState(false)
    const onMouseDown = e => {
        setIsScrolling(prevIsScrolling => (
            {
                ...prevIsScrolling, isScrolling: true
            }));
        setClientX(prevClientX => (
            {
                ...prevClientX, clientX: e.clientX
            }));
    }

    const onMouseUp = () => {
        setIsScrolling(prevIsScrolling => (
            {
                ...prevIsScrolling, isScrolling: false
            }));
    }

    const onMouseMove = (e) => {
        if (isScrolling) {
            ref.current.scrollLeft = scrollX + e.clientX - clientX;
            setScrollX((scrollX + e.clientX - clientX))
            setClientX(e.clientX)
        }
    }

    return (
        <div
            ref={ref}
/*            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}*/
            className={rootClass}
        >
            {children}
        </div>
    )
}

ScrollDrag.defaultProps = {
    rootClass: '',
}

ScrollDrag.propTypes = {
    rootClass: PropTypes.string
}