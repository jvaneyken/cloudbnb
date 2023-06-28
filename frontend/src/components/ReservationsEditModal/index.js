import './ReservationsEditModal.css'
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import '../../context/Modal.css'
import { updateReservation } from '../../store/reservations';

const ReservationsEditModal = ({currentReservation, closeModal}) => {
    const dispatch = useDispatch();

    const [checkInDate, setCheckInDate] = useState(currentReservation.checkInDate);
    const [checkOutDate, setCheckOutDate] = useState(currentReservation.checkOutDate);
    const [numGuests, setNumGuests] = useState(currentReservation.numGuests);

    const handleClick = () => {
        const reservation = { ...currentReservation, checkInDate, checkOutDate, numGuests };
        dispatch(updateReservation(reservation));
        closeModal();
    }

    const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const getCurrentDate = () => {
        let currentDate = '';
        const d = new Date();
        currentDate += d.getFullYear() + "-" + (String(d.getMonth() + 1).padStart(2, '0')) + "-" + String(d.getDate()).padStart(2, '0');
        return currentDate;
    }   

    return(
        <div id="reservation-update-modal-background">
            <div id='reservation-update-modal'>
                <div id='reservation-update-modal-content'>
                    <button className='reservation-update-cancel-button' onClick={() => closeModal()} >X</button>
                <div id='reservation-update-title'>Update your Reservation!</div>
                    <form id='reservation-update-form' >
                        <input className='reservation-update-date-input' type="date" onChange={((e)=> setCheckInDate(e.target.value))} value={checkInDate} min={getCurrentDate()} />
                        <input className='reservation-update-date-input' type="date" onChange={((e)=> setCheckOutDate(e.target.value))} value={checkOutDate} min={checkInDate} />
                        <select onChange={((e)=> setNumGuests(e.target.value))} value={numGuests} id='reservation-update-select-num-guests'>
                                <option disabled>Select Number of guests</option>
                                {guestOptions.map((option) => (
                                    <option key={option} value={option}>
                                    {option}
                                    </option>
                                ))}
                            </select>
                        <button id='res-form-update-button' type='button' onClick={handleClick}><span>Update</span></button>
                    </form>
                </div>
            </div>
        </div>
    )

} 

export default ReservationsEditModal;