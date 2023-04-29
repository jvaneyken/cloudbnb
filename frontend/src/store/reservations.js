import csrfFetch from "./csrf";

const RECEIVE_RESERVATIONS = 'reservations/receiveReservations';
const RECEIVE_RESERVATION = 'reservations/receiveReservation';
const REMOVE_RESERVATION = 'reservations/receiveReservations';

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

export const fetchReservations = () => async dispatch => {
    const response = await csrfFetch(`/api/reservations`);
    if (response.ok) {
        const reservations = await response.json();
        dispatch(receiveReservations(reservations));
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
        body: JSON.stringify(reservation)
    });
    if (response.ok) {
        const reservation = await response.json();
        dispatch(receiveReservation(reservation));
    }
}