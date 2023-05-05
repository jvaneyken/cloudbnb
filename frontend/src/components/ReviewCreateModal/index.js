import './ReviewCreateModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createReview } from '../../store/reviews';

const ReviewCreateModal = ({listingId, closeCreateModal}) => {
    const userId = useSelector(state => state.session.user.id);
    // const username = useSelector(state => state.session.user.userName)
    

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

    const handleClick = () => {
        const newReview = {...review, rating, body}
        dispatch(createReview(newReview));
        closeCreateModal();
    }

    return(
        <>
            <div>I am the Review Create Modal</div>
            <div>Leave a Review</div>
            <label htmlFor="create-rating">Rating</label>
            <select onChange={((e)=> setRating(e.target.value))} id='create-rating'>
                <option selected disabled>Choose a rating</option>
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
            </select>
            <input type='textarea' onChange={((e)=> setBody(e.target.value))}/>
            <button onClick={handleClick}>Leave Review</button>
        </>
    )
}   

export default ReviewCreateModal;