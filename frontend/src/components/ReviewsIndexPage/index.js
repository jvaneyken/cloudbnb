import './ReviewsIndexPage.css';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, getReviews } from '../../store/reviews';
import { useEffect, useState } from 'react';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewEditModal from '../ReviewEditModal';
import { deleteReview } from '../../store/reviews';
// import {createSelector} from 'reselect'; 
// import { getListingReviews } from '../../store/reviews';
// import { useParams } from 'react-router-dom';

const ReviewsIndexPage = ({listingId}) => {
    // const { listingId } = useParams();
    // const reviews = useSelector(getListingReviews(parseInt(listingId)));
    // const selectReviews = createSelector(
    //     state => state.reviews,
    //     reviews => Object.values(reviews).filter(review => review.listingId === listingId)
    // );
    const reviews = useSelector(getReviews(parseInt(listingId)));
    // const reviews = useSelector(selectReviews);
    
    const dispatch = useDispatch()

    const [showReviewCreateModal, setShowReviewCreateModal] = useState(false);
    const [showReviewEditModal, setShowReviewEditModal] = useState(false);

    useEffect(()=> {
        dispatch(fetchReviews());
    }, [dispatch])

    const [currentReview, setCurrentReview] = useState({});

    // useEffect(()=> {
    //     dispatch(fetchReviews());
    // }, [])

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
            <div>
                {reviews && reviews.map((review) => (
                <div key={review.id}>
                    <FaUserCircle />
                    <div>{review.userName}</div>
                    <div>{review.rating}</div>
                    <div>{review.createdAt}</div>
                    <div>{review.body}</div>
                    <button onClick={()=>handleReviewEdit(review)}>Edit</button>
                    <button onClick={()=> dispatch(deleteReview(review.id))}>Delete</button>
                 </div>
                ))}
                <div>
                    <button onClick={()=> setShowReviewCreateModal(prev => !prev)}>Leave a review</button>
                </div>
            </div>
        </>
    )
}

export default ReviewsIndexPage;