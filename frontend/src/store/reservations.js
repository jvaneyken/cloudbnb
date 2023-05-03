import csrfFetch from "./csrf";

// action constants 
const RECEIVE_RESERVATIONS = 'reservations/receiveReservations';
const RECEIVE_RESERVATION = 'reservations/receiveReservation';
const REMOVE_RESERVATION = 'reservations/removeReservation';

// actions
export const receiveReservations = reservations => ({
    type: RECEIVE_RESERVATIONS,
    reservations
})

export const receiveReservation = reservation => ({
    type: RECEIVE_RESERVATION,
    reservation
})

export const removeReservation = reservationId => ({
    type: REMOVE_RESERVATION,
    reservationId
})


// thunk action creators
export const fetchReservations = () => async dispatch => {
    const response = await csrfFetch(`/api/reservations`);
    if (response.ok) {
        const {reservations } = await response.json();
        if (reservations) {
            dispatch(receiveReservations(reservations));
        }
    }
}

export const fetchReservation = (reservationId) => async dispatch => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`);
    if (response.ok) {
        const reservation = await response.json();
        dispatch(receiveReservation(reservation));
    }
}

export const createReservation = (reservation) => async dispatch => {
    const response = await csrfFetch(`/api/reservations`, {
        method: 'POST',
        Headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({reservation})
    });
    if (response.ok) {
        const {reservation} = await response.json();
        dispatch(receiveReservation(reservation));
    }
}

export const updateReservation = (reservation) => async dispatch => {
    const response = await csrfFetch(`/api/reservations/${reservation.id}`, {
        method: 'PATCH',
        Headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
    });
    if (response.ok) {
        const {reservation} = await response.json();
        dispatch(receiveReservation(reservation));
    }
}

export const deleteReservation = (reservationId) => async dispatch => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeReservation(reservationId));
    }
}

const reservationsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RESERVATIONS:
            return action.reservations;
        case RECEIVE_RESERVATION:
            return { ...state, [action.reservation.id]: action.reservation };
        case REMOVE_RESERVATION:
            const newState = { ...state};
            delete newState[action.reservationId];
            return newState;
        default:
            return state;
    }
}


export default reservationsReducer;


