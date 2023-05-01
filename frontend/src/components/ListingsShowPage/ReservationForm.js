import React from 'react';
import { createReservation } from '../../store/reservations';
import './ReservationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


const ReservationForm = ({ listing }) => {
    const userId = useSelector(state => state.session.user.id);
    const history = useHistory();
    const dispatch = useDispatch();
    let reservation = {
        userId: '',
        checkInDate: '',
        checkOutDate: '',
        numGuests: '',
        listingId: ''
    }
    // const { listingId } = listing; 

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numGuests, setNumGuests] = useState('');


    
    const handleClick = () => {
        reservation = { ...reservation, userId, checkInDate, checkOutDate, numGuests, listingId: listing.id }
        dispatch(createReservation(reservation));
        let path = '/reservations';
        history.push(path);
    }
    // :id, :user_id, :check_in_date, :check_out_date, :num_guests, :listing_id
    // :user_id, :check_in_date, :check_out_date, :num_guests, :listing_id

    return(
        <>
            <div className="outer-div">
                <div>
                    <div className="reservation-form-price-reviews">
                        <div><span>$ {listing.price}</span> <span>night</span></div>
                        <div>478 reviews</div>
                    </div>
                    <div>
                        <form >
                            <input type="date" onChange={((e)=> setCheckInDate(e.target.value))} placeholder="Check in date" />
                            <input type="date" onChange={((e)=> setCheckOutDate(e.target.value))} placeholder="Check out date" />
                            <input type="text" onChange={((e)=> setNumGuests(e.target.value))} placeholder="Number of guests" />
                            <button type='button' onClick={handleClick}><span>Reserve</span></button>
                        </form>
                    </div>
                </div>
                <div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReservationForm;