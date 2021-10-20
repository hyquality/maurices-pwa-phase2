import PropTypes from 'prop-types';
import React from "react";
import Button from "@components/templates/button";
import Container from "@components/container";
import Carousel from "@components/templates/carousel";

export default function InstaSlide(
    {
        fullwidth,
        paddingTop,
        paddingBottom,
        title,
        hash,
        text,
        buttonTitle,
        ButtonUrl,
        data,
        className,
        ...props}
) {

    const onClick =(e)=> {
        ButtonUrl?(
                console.log("clicked")
        ):(
            console.log("clicked")
        )
    }

    const content = (
        <div className={`overflow-hidden justify-center ${paddingTop && "pt-sectionBT"} ${paddingBottom && "pb-sectionBT"}`}>
          <div>
              <h3 className={`text-center font-normal uppercase tracking-widest`}>
                  <span className={`block md:inline-block`}>{title}</span>
                  <span className={`tracking-normal relative font-utopia text-4xl text-gray_4 lowercase px-2 ml-4`}>
                      <span className={`z-10 relative`}>#{hash}</span>
                      <span className={`absolute inset-x-0 h-4/5 bg-green_2 z-0 top-3 `}/>
                  </span>
              </h3>
              <p className={`text-center pt-7 pb-10 px-4 m-auto `} dangerouslySetInnerHTML={{__html: text}}/>

              <Carousel templates={data} context={"slider-insta-carousel"} visibleNum={5} mobileVisibleNum={2} showScrollMobile={true} showNavMobile={false} showNav={false} loop={false} spaceBetween={10}/>

              <Button className={`mx-auto mt-12`} onClick={onClick} color={'gray_2'} size={`medium`} label={buttonTitle}/>
          </div>
        </div>
    )

    return (
        fullwidth ? (
            content
        ) : (
            <Container>
                {content}
            </Container>

        )
    )
}

InstaSlide.propTypes = {
    fullwidth: PropTypes.bool,
    paddingTop: PropTypes.bool,
    paddingBottom: PropTypes.bool,
    title:PropTypes.string,
    hash:PropTypes.string,
    text:PropTypes.string,
    buttonTitle: PropTypes.string,
    ButtonUrl:PropTypes.string,
    data: PropTypes.any,
    className:PropTypes.string
}
InstaSlide.defaultProps = {
    fullwidth: false,
    paddingTop: false,
    paddingBottom: false,
    title:"",
    hash:"",
    text:"",
    buttonTitle: "",
    ButtonUrl:"",
    data:[],
    className:"",
    onClick: undefined,
};