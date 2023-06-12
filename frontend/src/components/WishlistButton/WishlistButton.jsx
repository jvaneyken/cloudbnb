import './WishlistButton.css';
import { BsHeartFill} from 'react-icons/bs';

const WishlistButton = ({style, text}) => {
    return(
        <>
            <button className='wishlist-button' style={style.buttonStyle}>
                <BsHeartFill style={style.iconStyle} className='heart-icon' />
                {text && <span style={style.textStyle}>{text}</span>}
            </button>
        </>
    )
}

export default WishlistButton;