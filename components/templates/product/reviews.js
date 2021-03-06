import React from "react";
import PropTypes from 'prop-types';
import Icon from "@components/templates/icon";
import {
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
    faStar as fasStar
} from "@fortawesome/free-regular-svg-icons";

export default function Reviews({reviews, size, showReviewNumber,showAvg, className, productSlug}) {
    const reviewsStars = [1, 2, 3, 4, 5]
    return (
        <>
            {
                reviews ? (
                    <div className={`reviews flex items-center ${className}`}>
                        <div className={"flex items-center"}>
                            {
                                reviewsStars.map((r, index) => (
                                    <span key={"review-" + productSlug + index}>
                                            {
                                                r > reviews.avg ? (
                                                    <span>
                                                        <Icon icon={fasStar}
                                                              className="px-0.5" size={size}/>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <Icon icon={faStar}
                                                              className="px-0.5" size={size}/>
                                                    </span>
                                                )
                                            }
                                        </span>


                                ))
                            }
                            {
                                showAvg ? (
                                    <span className="text-xs pl-1.5">{reviews.avg }</span>
                                ) : ("")
                            }
                            {
                                showReviewNumber ? (
                                    <span className="text-xs pl-1.5">({reviews.total})</span>
                                ) : ("")
                            }
                        </div>
                    </div>
                ) : null
            }
        </>

    )
}

Reviews.propTypes = {
    reviews: PropTypes.shape({
            total: PropTypes.number.isRequired,
            avg: PropTypes.number
        }
    ).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    showReviewNumber: PropTypes.bool,
    showAvg: PropTypes.bool,
    className: PropTypes.string
}

Reviews.defaultProps = {
    reviews: {
        "total": 4,
        "avg": 3
    },
    size: "small",
    showReviewNumber: true,
    showAvg: false,
    className: "",
    productSlug: "",
};