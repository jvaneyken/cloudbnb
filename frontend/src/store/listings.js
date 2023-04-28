import csrfFetch from "./csrf";

const RECEIVE_LISTINGS = 'listings/receiveListings';
const RECEIVE_LISTING = 'listings/receiveListing';

export const receiveListings = listings => ({
    type: RECEIVE_LISTINGS,
    listings
})

export const receiveListing = listing => ({
    type: RECEIVE_LISTING,
    listing
})

export const fetchListings = () => async dispatch => {
    const response = await csrfFetch('/api/listings');
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListings(data.listings));
    }
}

export const fetchListing = (listingId) => async dispatch => {
    const response = await csrfFetch(`/api/listings/${listingId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveListing(data.listing));
    }
};

const listingsReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case RECEIVE_LISTINGS:
            return { ...action.listings };
        case RECEIVE_LISTING:
            newState = { ...state };
            newState[action.listing.id] = action.listing;
            return newState
        default:
            return state;
    }

}

export default listingsReducer;