import './WishlistIndexPage.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchWishlists } from '../../store/wishlists';
import WishlistButton from '../WishlistButton/WishlistButton';

const WishlistIndexPage = () => {
    const wishlists = useSelector(state => Object.values(state.wishlists));
    const dispatch = useDispatch();

    useEffect(()=> {
            dispatch(fetchWishlists());
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
            fill: 'rgba(0, 0, 0, 0.1)',
            fontSize: '1.4rem'
        }
    }

    const wishlistButtonPressedStyle = {
        buttonStyle: {
            display: 'flex',
            alignContent: 'center'
        },
        iconStyle: { 
            stroke: 'white',
            strokeWidth: '1',
            overflow: 'visible',
            // fill: 'rgb(255,56,92)',
            fill: '#1FBEFF',
            fontSize: '1.4rem'
        }
    }

    const wishlistListingIds = wishlists.map((wishlist) => wishlist.listingId);

    return(
        <>
            <div className='wishlists-container'>
                <div className="wishlists-header">
                    <h1>Wishlist</h1>
                </div>
                {wishlists.length === 0 ? (
                    <div className='no-wishlists-container'>
                        <h2>No saves yet</h2>
                        <p>As you search, click the heart icon to save your favorite places and Experiences to a wishlist.</p>
                        <Link to={`/`} >
                            <button>Start exploring</button>
                        </Link>
                    </div>
                ) : (
                <div className="wishlists-wrapper">
                    {wishlists.map((wishlist) => (
                        <div className='wishlist-parent'>
                            <Link className="wishlists-link" to={`listings/${wishlist.listingId}`}  key={wishlist.id}>
                                <div className="wishlists-div">
                                    <img src={wishlist.photoUrls[0]} className="wishlists-image" alt="placeholder"/>
                                    <div className="wishlists-details">
                                        <p><span>{wishlist.numBeds} beds</span></p>
                                        <p><span>${wishlist.price}</span> night</p>
                                    </div>
                                </div>
                            </Link>
                            <div className='wishlists-wishlist-button-container'>
                                <div className="heart-icon"><WishlistButton style={wishlistListingIds.includes(wishlist.listingId) ? wishlistButtonPressedStyle : wishlistButtonDefaultStyle} listingId={wishlist.listingId} /></div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>

        </>
    )
}

export default WishlistIndexPage;