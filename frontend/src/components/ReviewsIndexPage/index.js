import './ReviewsIndexPage.css';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, getReviews } from '../../store/reviews';
import { useEffect, useState } from 'react';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewEditModal from '../ReviewEditModal';
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

    // useEffect(()=> {
    //     dispatch(fetchReviews());
    // }, [])

    

    return(
        <>
        {showReviewCreateModal && (
            <ReviewCreateModal 
                listingId={listingId}
                closeModal={()=> setShowReviewCreateModal(false)} />
        )}
        {showReviewEditModal && (
            <ReviewEditModal />
        )}
            <div>
                {reviews && reviews.map((review) => (
                <div key={review.id}>
                    <FaUserCircle />
                    <div>{review.userName}</div>
                    <div>{review.createdAt}</div>
                    <div>{review.body}</div>
                    <button onClick={()=> setShowReviewEditModal(prev => !prev)}>Edit</button>
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