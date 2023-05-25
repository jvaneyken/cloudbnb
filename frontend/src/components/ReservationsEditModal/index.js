import './ReservationsEditModal.css'
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import '../../context/Modal.css'
import { updateReservation } from '../../store/reservations';

const ReservationsEditModal = ({currentReservation, closeModal}) => {
    console.log(currentReservation, "current res");
    // const userId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch()
    // const history = useHistory();
    // let reservation = {
    //     userId: '',
    //     checkInDate: '',
    //     checkOutDate: '',
    //     numGuests: '',
    //     listingId: ''
    // }

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [numGuests, setNumGuests] = useState('');


    
    const handleClick = () => {
        const reservation = { ...currentReservation, checkInDate, checkOutDate, numGuests };
        dispatch(updateReservation(reservation));
        closeModal();
    }

    return(
        <div id="reservation-update-modal-background">
            <div id='reservation-update-modal'>
                <div id='reservation-update-modal-content'>
                <div id='reservation-update-title'>Update your Reservation!</div>
                    <form id='reservation-update-form' >
                        <input className='reservation-update-date-input' type="date" onChange={((e)=> setCheckInDate(e.target.value))} placeholder="Check in date" />
                        <input className='reservation-update-date-input' type="date" onChange={((e)=> setCheckOutDate(e.target.value))} placeholder="Check out date" />
                        {/* <input type="text" onChange={((e)=> setNumGuests(parseInt(e.target.value)))} placeholder="Number of guests" /> */}
                        <select onChange={((e)=> setNumGuests(e.target.value))} placeholder="Number of guests" id='reservation-update-select-num-guests'>
                                <option selected disabled>Select Number of guests</option>
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
                        <button id='res-form-update-button' type='button' onClick={handleClick}><span>Update</span></button>
                    </form>
                </div>
            </div>
        </div>
    )

} 

export default ReservationsEditModal;