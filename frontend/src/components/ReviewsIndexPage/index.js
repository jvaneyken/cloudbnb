import './ReviewsIndexPage.css';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
// import { getListingReviews } from '../../store/reviews';
// import { useParams } from 'react-router-dom';

const ReviewsIndexPage = ({listingId}) => {
    // const { listingId } = useParams();
    // const reviews = useSelector(getListingReviews(parseInt(listingId)));
    const reviews = useSelector((state)=> Object.values(state.reviews));

    return(
        <>
            <div>
                <div>
                    <FaUserCircle />
                    <div>User</div>
                    <div>the date</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                {reviews && reviews.map((review) => (
                     <div>
                     <FaUserCircle />
                     <div>User</div>
                     <div>the date</div>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                 </div>
                ))}
            </div>
        </>
    )
}

export default ReviewsIndexPage;