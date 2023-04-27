import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListings } from "../../store/listings";
import './ListingsIndexPage.css'
import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg'

const ListingsIndexPage = () => {
    const listings = useSelector(state => Object.values(state.listings));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchListings());
    }, [dispatch])

    return(
            <div className="listings-container">
                {listings.map((listing) => (
                    <div className="listing-div" key={listing.id}>
                        <img src={placeHolderImage} className="listing-image" alt="placeholder" />
                        <p><span>{listing.location}</span></p>
                        <p><span>${listing.price}</span> night</p>
                    </div>
                ))}
            </div>

    )

}

export default ListingsIndexPage;