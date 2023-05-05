import './ReviewEditModal.css'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateReview } from '../../store/reviews';

const ReviewEditModal = ({currentReview, closeEditModal}) => {

    const dispatch = useDispatch();

    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');

    const handleClick = () => {
        const updatedReview = {...currentReview, rating, body};
        dispatch(updateReview(updatedReview));
        closeEditModal();
    }


    return(
        <>
            <div id='review-edit-modal-background'>
                <div id='review-edit-modal'>
                    <div id='review-edit-modal-content'>
                        <div>Leave a Review</div>
                        <label htmlFor="edit-rating">Rating</label>
                        <select onChange={((e)=> setRating(e.target.value))} id='edit-rating'>
                            <option selected disabled>Choose a rating</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                        </select>
                        <input type='textarea' onChange={((e)=> setBody(e.target.value))}/>
                        <button onClick={handleClick}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewEditModal;