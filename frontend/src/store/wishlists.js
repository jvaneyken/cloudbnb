import csrfFetch from "./csrf";

const RECEIVE_WISHLISTS = 'wishlists/receiveWishlists';
const RECEIVE_WISHLIST = 'wishlists/receiveWishlist';
const REMOVE_WISHLIST = 'wishlists/removeWishlist';
const CLEAR_WISHLISTS = 'wishlists/clearWishlists';


export const receiveWishlists = wishlists => ({
    type: RECEIVE_WISHLISTS,
    wishlists
})

export const receiveWishlist = wishlist => ({
    type: RECEIVE_WISHLIST,
    wishlist
})

export const removeWishlist = wishlistId => ({
    type: REMOVE_WISHLIST,
    wishlistId
})

export const clearWishlists = () => ({
    type: CLEAR_WISHLISTS
})


// thunk action creators
export const fetchWishlists = () => async dispatch => {
    const response = await csrfFetch(`/api/wishlists`);
    if (response.ok) {
        const { wishlists } = await response.json();
        if (wishlists) {
            dispatch(receiveWishlists(wishlists));
        }
    }
}

export const createWishlist = wishlist => async dispatch => {
    const response = await csrfFetch(`/api/wishlists/`, {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({wishlist})
    });
    if (response.ok) {
        const { wishlist } = await response.json();
        dispatch(receiveWishlist(wishlist));
    }
}

export const deleteWishlist = wishlistId => async dispatch => {
    await csrfFetch(`/api/wishlists/${wishlistId}`, {
        method: 'DELETE'
    });
    dispatch(removeWishlist(wishlistId));
}

const wishlistsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_WISHLISTS:
            return action.wishlists;
        case RECEIVE_WISHLIST:
            return { ...state, [action.wishlist.id]: action.wishlist };
        case REMOVE_WISHLIST:
            const newState = { ...state };
            delete newState[action.wishlistId];
            return newState;
        case CLEAR_WISHLISTS:
            return {};
        default:
            return state;
    }
}

export default wishlistsReducer;