import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListing } from "../../store/listings";
import './ListingsShowPage.css'
// import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg'
import { useParams } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import ReservationForm from "./ReservationForm";
import ReviewsIndexPage from "../ReviewsIndexPage";
import WishlistButton from "../WishlistButton/WishlistButton";


const ListingsShowPage = () => {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector(state => state.listings[listingId]);
    const [i, setI] = useState(0);

    useEffect(()=> {
        dispatch(fetchListing(listingId));
        // dispatch(fetchReviews);
    }, [dispatch, listingId])

    const handleImageClick = (index) => {
        setI(index + i)
    }

    if (!listing) {
        return null;
    }

    const wishlistButtonDefaultStyle = {
        buttonStyle: {
            display: 'flex',
            alignItems: 'center'
        },
        iconStyle: { 
            stroke: 'black',
            strokeWidth: '1',
            overflow: 'visible',
            fill: 'rgba(0, 0, 0, 0)',
            fontSize: '1rem'
        },
        textStyle: {
            fontSize: '1rem',
            textDecoration: 'underline',
            marginLeft: '0.7rem'
        }
    }

    const wishlistButtonPressedStyle = {
        fill: '#1FBEFF'
    }

    return(
        <>
            <div className="listing-container">
                <div>
                    <div className="listing-heading-div">
                        <h1>{listing.heading}</h1>
                    </div>
                    <div className="listing-sub-heading" >
                        <div className="listing-p-div">
                            <p>{listing.location}</p>
                        </div>
                        <div className='listings-show-wishlist-div'>
                            <WishlistButton style={wishlistButtonDefaultStyle}  text={'Save'} />
                        </div>
                    </div>
                    <div className="listing-image-grid">
                        <div className="listing-image-div featured">
                            <img onClick={()=> handleImageClick(0)} src={listing.photoUrls[(i + 0) % 5]} alt="placeholder" className="listing-image left"/>
                        </div>
                        <div className="listing-image-div disappear">
                            <img onClick={()=> handleImageClick(1)} className="listing-image" src={listing.photoUrls[(i + 1) % 5]} alt="placeholder"/>
                        </div>
                        <div className="listing-image-div disappear">
                            <img onClick={()=> handleImageClick(2)} className="listing-image  top-right" src={listing.photoUrls[(i + 2) % 5]} alt="placeholder"/>
                        </div>
                        <div className="listing-image-div disappear">
                            <img onClick={()=> handleImageClick(3)} className="listing-image" src={listing.photoUrls[(i + 3) % 5]} alt="placeholder"/>
                        </div>
                        <div className="listing-image-div disappear">
                            <img onClick={()=> handleImageClick(4)} className="listing-image  bottom-right" src={listing.photoUrls[(i + 4) % 5]} alt="placeholder"/>
                        </div>
                    </div>
                    <div className="listing-details-parent">
                        <div className="listing-details-container">
                            <div className="listing-details-div">
                                <div>
                                    <h1 className="listing-details-title">Entire property hosted by Guillermo</h1>
                                    <div className="listing-details">    
                                        <span>{listing.numGuests} guests</span>
                                        <span>&#x2022;</span>
                                        <span>{listing.numBedrooms} bedrooms</span>
                                        <span>&#x2022;</span>
                                        <span>{listing.numBeds} beds</span>
                                        <span>&#x2022;</span>
                                        <span>{listing.numBaths} baths</span>
                                    </div>
                                </div>
                                <div><FaUserCircle id="listing-profile-icon"/></div>
                            </div>
                        </div>
                        <div>
                            <div className="reservation-form-container">
                                <ReservationForm listing={listing}/>
                            </div>
                        </div>
                    </div>
                    <ReviewsIndexPage listingId={listingId}/>
                </div>
            </div>
        </>
       
    )
}

export default ListingsShowPage;