import csrfFetch from "./csrf";

// action constants
const RECEIVE_REVIEWS = 'reviews/receiveReviews';
const RECEIVE_REVIEW = 'reviews/receiveReview';
const REMOVE_REVIEW = 'reviews/removeReview';


//actions
export const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

export const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

export const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

// selectors
export const getReviews = listingId => state => (
        Object.values(state.reviews)
        .filter(review => review.listingId === listingId)
);


// export const getReviews = state => {
//     return state.reviews ? Object.values(state.reviews) : []
// }
 
// thunk action creators
export const fetchReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews`);
    if (response.ok) {
        const { reviews } = await response.json();
        if (reviews) {
            dispatch(receiveReviews(reviews));
        }
    }
}

export const fetchReview = reviewId => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`);
    if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review));
    }
}

export const createReview = review => async dispatch => {
    const response = await csrfFetch(`/api/reviews/`, {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({review})
    });
    if (response.ok) {
        const {review} = await response.json();
        dispatch(receiveReview(review))
    }
}

export const updateReview = review => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        Headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({review})
    });
    if (response.ok) {
        const {review} = await response.json();
        dispatch(receiveReview(review))
    }
}

export const deleteReview = reviewId => async dispatch => {
    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    dispatch(removeReview(reviewId));
}

 const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_REVIEWS:
            return action.reviews;
        case RECEIVE_REVIEW:
            return {...state, [action.review.id]: action.review};
        case REMOVE_REVIEW:
            const newState = {...state};
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;