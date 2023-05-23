import './ReviewsIndexPage.css';
import { FaUserCircle, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, getReviews } from '../../store/reviews';
import { useEffect, useState } from 'react';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewEditModal from '../ReviewEditModal';
import { deleteReview } from '../../store/reviews';

const ReviewsIndexPage = ({listingId}) => {
    const reviews = useSelector(getReviews(parseInt(listingId)));
    const userId = useSelector(state => state.session.user?.id);
    console.log(userId);
    
    const dispatch = useDispatch()

    const [showReviewCreateModal, setShowReviewCreateModal] = useState(false);
    const [showReviewEditModal, setShowReviewEditModal] = useState(false);

    useEffect(()=> {
        dispatch(fetchReviews());
    }, [dispatch])

    const [currentReview, setCurrentReview] = useState({});

    const handleReviewEdit = (review) => {
        setCurrentReview(review);
        setShowReviewEditModal(prev => !prev);
    }
    

    return(
        <>
        {showReviewCreateModal && (
            <ReviewCreateModal 
                listingId={listingId}
                closeCreateModal={()=> setShowReviewCreateModal(false)} />
        )}
        {showReviewEditModal && (
            <ReviewEditModal 
                currentReview={currentReview} 
                closeEditModal={()=> setShowReviewEditModal(false)} />
        )}
            <div className='reviews-container'>
                {reviews && reviews.map((review) => (
                <div className='review-div' key={review.id}>
                    <div className='reviews-header'>
                        <div>
                            < FaUserCircle className='review-profile'/>
                        </div>
                        <div className='review-user-date-rating'>
                            <div>
                                <div className="review-username">{review.userName}</div>
                                <div className='review-date'>{new Date(review.createdAt).toLocaleDateString("en-US", {
                                    month: 'long',
                                    year: 'numeric'   
                                })}</div>
                            </div>
                            <div className='review-rating'>< FaStar /><div>{review.rating}</div></div>
                        </div>
                    </div>
                    <div className='review-body'>{review.body}</div>
                    {userId === review.userId ?    
                    <>
                        <button className='review-edit-delete' onClick={()=>handleReviewEdit(review)}>Edit</button>
                        <button className='review-edit-delete' onClick={()=> dispatch(deleteReview(review.id))}>Delete</button> 
                    </> 
                    : null }
                 </div>
                ))}
            </div>
            { userId !== undefined ?  
            <div>
                <button  id='review-button' onClick={()=> setShowReviewCreateModal(prev => !prev)}>Leave a review</button>
            </div>
            : null }
        </>
    )
}

export default ReviewsIndexPage;