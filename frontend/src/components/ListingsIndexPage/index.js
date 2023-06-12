import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import './ListingsIndexPage.css'
// import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg'
import {Link} from 'react-router-dom';
import WishlistButton from "../WishlistButton/WishlistButton";

const ListingsIndexPage = () => {
    const listings = useSelector(state => Object.values(state.listings));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchListings());
    }, [dispatch])

    const wishlistButtonDefaultStyle = {
        buttonStyle: {
            display: 'flex',
            alignContent: 'center'
        },
        iconStyle: { 
            stroke: 'white',
            strokeWidth: '1',
            overflow: 'visible',
            fill: 'rgba(0, 0, 0, 0.5)',
            fontSize: '1.4rem'
        }
    }

    const wishlistButtonPressedStyle = {
        fill: '#1FBEFF'
    }

    return(
        <div className="listings-container">
            {listings.map((listing) => (
                <div className='listing-parent'>
                    <Link className="listings-link" to={`listings/${listing.id}`}  key={listing.id}>
                        <div className="listings-div">
                            <img src={listing.photoUrls[0]} className="listings-image" alt="placeholder"/>
                            <div className="listings-details">
                                <p><span>{listing.location}</span></p>
                                <p><span>${listing.price}</span> night</p>
                            </div>
                        </div>
                    </Link>
                    <div className='listings-wishlist-button-container'>
                        <div className="heart-icon"><WishlistButton style={wishlistButtonDefaultStyle} /></div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default ListingsIndexPage;