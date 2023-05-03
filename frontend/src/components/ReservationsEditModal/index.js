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
        closeModal()
    }

    return(
        <div id="modal-background">
            <div id='modal'>
                <div id='modal-content'>
                    <form >
                        <input type="date" onChange={((e)=> setCheckInDate(e.target.value))} placeholder="Check in date" />
                        <input type="date" onChange={((e)=> setCheckOutDate(e.target.value))} placeholder="Check out date" />
                        <input type="text" onChange={((e)=> setNumGuests(parseInt(e.target.value)))} placeholder="Number of guests" />
                        <button type='button' onClick={handleClick}><span>Update</span></button>
                    </form>
                </div>
            </div>
        </div>
    )

} 

export default ReservationsEditModal;