import './WishlistIndexPage.css';
import { Link } from 'react-router-dom';

const WishlistIndexPage = () => {
    let wishlists = [];

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
                    <div>Something Else</div>
                )}
            </div>

        </>
    )
}

export default WishlistIndexPage;