import './WishlistButton.css';
import { BsHeartFill} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { createWishlist, deleteWishlist } from '../../store/wishlists';

const WishlistButton = ({style, text, listingId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const wishlists = useSelector(state => Object.values(state.wishlists));
    let userId;
    if (user) {
        userId = user.id;
    }

    const currentWishlist = wishlists.filter((wishlist) => wishlist.listingId === listingId);
    // const wishlistListingIds = wishlists.map((wishlist) => wishlist.listingId);

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