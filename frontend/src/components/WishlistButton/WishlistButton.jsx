import './WishlistButton.css';
import { BsHeartFill} from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { createWishlist } from '../../store/wishlists';

const WishlistButton = ({style, text, listingId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    let userId;
    if (user) {
        userId = user.id;
    }

    const handleClick = () => {
            if (user) {
                const wishlist = { userId,  listingId };
                dispatch(createWishlist(wishlist));
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