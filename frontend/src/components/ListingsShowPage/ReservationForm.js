import React from 'react';
import { createReservation } from '../../store/reservations';
import './ReservationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ReservationForm = ({ listing }) => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numGuests, setNumGuests] = useState('');
    const [errors, setErrors] = useState([]);
    
    const handleClick = () => {
        if (user) {
            const validationErrors = [];

            if (checkInDate === '') {
              validationErrors.push('Check In date cannot be empty');
            }
      
            if (checkOutDate === '') {
              validationErrors.push('Check Out date cannot be empty');
            }
      
            if (numGuests === '') {
              validationErrors.push('Please select the number of guests');
            }
      
            if (validationErrors.length > 0) {
              setErrors(validationErrors);
              return;
            }

            const reservation = { userId: user.id, checkInDate, checkOutDate, numGuests, listingId: listing.id }
            dispatch(createReservation(reservation))
            history.push('/reservations');
        } else {    
            history.push('/login', { from: history.location });
        }
    }

    const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const getCurrentDate = () => {
        let currentDate = '';
        const d = new Date();
        currentDate += d.getFullYear() + "-" + (String(d.getMonth() + 1).padStart(2, '0')) + "-" + String(d.getDate()).padStart(2, '0');
        return currentDate;
      }      

    return(
        <>
            <div className="outer-div">
                <div>
                    <div className="reservation-form-price-reviews">
                        <div><span id='price-span'>$ {listing.price}</span> night</div>
                        <div><span id='reviews-span'>5 reviews</span></div>
                    </div>
                    <div>
                        <form >
                            <ul className="reservation-errors-ul">
                                {errors.map((error, index) => <li key={index}>{error}</li>)}
                            </ul>
                            <input required className='reservation-date-input' type="date" onChange={((e)=> setCheckInDate(e.target.value))} min={getCurrentDate()}  />
                            <input required className='reservation-date-input' type="date" onChange={((e)=> setCheckOutDate(e.target.value))} min={checkInDate === '' ? '' : checkInDate} />
                            <select onChange={((e)=> setNumGuests(e.target.value))} placeholder="Number of guests" id='reservation-select-num-guests'>
                                <option selected disabled>Select number of guests</option>
                                {guestOptions.map((option) => (
                                    <option key={option} value={option}>
                                    {option}
                                    </option>
                                ))}
                            </select>
                            <button id='res-form-button' type='button' onClick={handleClick}><span>Reserve</span></button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReservationForm;