import React from 'react';
import { createReservation } from '../../store/reservations';
import './ReservationForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ReservationForm = ({ listing }) => {
    const user = useSelector(state => state.session.user);
    let userId;
    if (user) {
        userId = user.id;
    }
    const history = useHistory();
    const dispatch = useDispatch();
    let reservation = {
        userId: '',
        checkInDate: '',
        checkOutDate: '',
        numGuests: '',
        listingId: ''
    }

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numGuests, setNumGuests] = useState('');
    const [errors, setErrors] = useState([]);


    
    const handleClick = () => {
        if (user) {
            reservation = { ...reservation, userId, checkInDate, checkOutDate, numGuests, listingId: listing.id }
            dispatch(createReservation(reservation))
            .then(() => history.push('/reservations'))
            .catch(async (res) => {
                let data;
                try {
                  // .clone() essentially allows you to read the response body twice
                  data = await res.clone().json();
                } catch {
                  data = await res.text(); // Will hit this case if the server is down
                }
                console.log(data, "this is the data");
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
              });
        } else {    
            history.push('/login', { from: history.location });
        }
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
                            <ul className="errors-ul">
                                {errors.map((error, index) => <li key={index}>{error}</li>)}
                            </ul>
                            <input className='reservation-date-input' type="date" onChange={((e)=> setCheckInDate(e.target.value))} placeholder="Check in date" />
                            <input className='reservation-date-input' type="date" onChange={((e)=> setCheckOutDate(e.target.value))} placeholder="Check out date" min={checkInDate === '' ? '' : checkInDate} />
                            <select onChange={((e)=> setNumGuests(e.target.value))} placeholder="Number of guests" id='reservation-select-num-guests'>
                                <option selected disabled>Select number of guests</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                                <option value="7" >7</option>
                                <option value="8" >8</option>
                                <option value="9" >9</option>
                                <option value="10">10</option>
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