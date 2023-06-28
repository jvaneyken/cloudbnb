import './ReviewCreateModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createReview } from '../../store/reviews';

const ReviewCreateModal = ({listingId, closeCreateModal, reviews}) => {
    const userId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch();
    let review = {
        // username: username,
        userId: userId,
        rating: '',
        body: '',
        listingId: listingId
    }

    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);

    const handleClick = () => {
        const validationErrors = [];

        if (rating === '') {
          validationErrors.push('Rating cannot be blank');
        }
  
        if (body === '') {
          validationErrors.push('Body of review cannot be blank');
        }
  
        if (validationErrors.length > 0) {
          setErrors(validationErrors);
          return;
        }
        const newReview = {...review, rating, body}
        dispatch(createReview(newReview));
        closeCreateModal();
    }

    const reviewExists =
     reviews.some(listingReview => listingReview.userId === userId);

    return(
        <> 
            { reviewExists ? (
                <div id='review-create-modal-background'>
                <div id='review-create-modal'>
                    <div id='review-create-modal-content'>
                        <div id='review-already-left'>You have already left a Review!</div>
                        <button onClick={() => closeCreateModal()}>Ok</button>
                    </div>
                </div>
            </div>
            ) : (
                <div id='review-create-modal-background'>
                    <div id='review-create-modal'>
                        <div id='review-create-modal-content'>
                        <button className='review-create-cancel-button' onClick={() => closeCreateModal()} >X</button>
                            <div id='review-create-title'>Leave a Review!</div>
                            <ul className="review-create-errors-ul">
                                {errors.map((error, index) => <li key={index}>{error}</li>)}
                            </ul>
                            <select onChange={((e)=> setRating(e.target.value))} id='review-create-rating'>
                                <option selected disabled>Choose a rating</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                            </select>
                            <textarea onChange={((e)=> setBody(e.target.value))}
                            id='review-create-text'
                            />
                            <button id='review-create-submit-button' onClick={handleClick}>Leave Review</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}   

export default ReviewCreateModal;