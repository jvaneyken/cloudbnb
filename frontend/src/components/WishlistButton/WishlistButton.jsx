import './WishlistButton.css';
import { BsHeartFill} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { createWishlist, deleteWishlist } from '../../store/wishlists';

const WishlistButton = ({style, text, listingId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const wishlists = useSelector(state => Object.values(state.wishlists));
    // console.log(typeof(wishlists[0].listingId), "type of wishlists at 0");
    console.log(typeof(listingId), "type of listingId");
    console.log(listingId, "listing id");
    console.log(wishlists, "listing wishlists");
    let userId;
    if (user) {
        userId = user.id;
    }

    const currentWishlist = wishlists.filter((wishlist) => wishlist.listingId === parseInt(listingId));
    // const wishlistListingIds = wishlists.map((wishlist) => wishlist.listingId);
    console.log(currentWishlist, "current wish list");

    const handleClick = () => {
        if (user) {
            if (currentWishlist.length !== 0) {
                dispatch(deleteWishlist(currentWishlist[0].id));
            } else {
                const wishlist = { userId,  listingId };
                dispatch(createWishlist(wishlist));
            }
        }    
    }

    return(
        <>
            <button className='wishlist-button' style={style.buttonStyle} onClick={handleClick}>
                <BsHeartFill style={style.iconStyle} className='heart-icon' />
                {text && <span style={style.textStyle}>{text}</span>}
            </button>
        </>
    )
}

export default WishlistButton;