import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import './ListingsIndexPage.css'
import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg'
import {Link} from 'react-router-dom';

const ListingsIndexPage = () => {
    const listings = useSelector(state => Object.values(state.listings));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchListings());
    }, [dispatch])

    return(
            <div className="listings-container">
                {listings.map((listing) => (
                    <Link className="listings-link" to={`listings/${listing.id}`}  key={listing.id}>
                        <div className="listings-div">
                            {/* <img src={listing.photoUrls[0]} className="listing-image" alt="placeholder" /> */}
                            <img src={listing.photoUrls[0]} className="listings-image" alt="placeholder"/>
                            <div className="listings-details">
                                <p><span>{listing.location}</span></p>
                                <p><span>${listing.price}</span> night</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

    )

}

export default ListingsIndexPage;