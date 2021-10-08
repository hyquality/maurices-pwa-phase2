import PropTypes from 'prop-types';
import React, {useState} from "react";
import Icon from "@components/icon";

export default function Popup({content="", visible = false, closePopup, className, ...props}) {

    return (
        <>
            {
                visible?(
                <div className="fixed flex justify-center items-center  inset-0 popup-wrapper z-50 close-popup">
                    <div className={"relative inner bg-white p-7 z-10 "+className}>
                        <a className="absolute right-2 top-2 close-popup cursor-pointer" onClick={closePopup}>
                            <Icon icon={["fas", "times"]} className="w-4 block"/>
                        </a>
                        {content}
                    </div>
                </div>
            ):null
            }

        </>
    )
}

Popup.propTypes = {
    visible: PropTypes.bool,
    className: PropTypes.string,
    content: PropTypes.any,

}
Popup.defaultProps = {
    visible: false,
    className: "",
    content: <div>1</div>,
};