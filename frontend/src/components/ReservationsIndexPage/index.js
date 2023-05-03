import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReservations, deleteReservation } from "../../store/reservations";
import './ReservationsIndexPage.css'
// import reservationsImage from '../../assets/airbnb_reservations_image2.jpg';
import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg';
import ReservationsEditModal from "../ReservationsEditModal";
// import {Link} from 'react-router-dom';



const ReservationsIndexPage = () => {
    const reservations = useSelector((state)=> Object.values(state.reservations));
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);


    useEffect(()=> {
        dispatch(fetchReservations())
    }, [dispatch])

    const [currentReservation, setCurrentReservation] = useState({});

    const handleReservationEdit = (reservation) => {
        // set current reservation = to reservation clicked
        // show modal
        setCurrentReservation(reservation);
        setShowModal(prev => !prev);
    }

    return(
            <>
            {showModal && (

                <ReservationsEditModal currentReservation={currentReservation}/> 
            )}
                <div className="reservations-container" >
                    <div>
                        <div>
                            <h1>Trips</h1>
                        </div>
                        <div>
                            <div className="no-trips-header hidden">
                                <div className="no-trips-content">
                                    <div>Handclap icon</div>
                                    <div>No trips booked...yet!</div>
                                    <div>Time to dust off your bags and start planning your next adventure</div>
                                </div>
                                <div className="no-trips-header-image">  
                                </div>
                            </div>
                        </div>
                        <div>
                            {reservations && reservations.map((reservation) => (
                                <div className="reservations-div" key={reservation.id}>
                                    <div className="reservations-div-image">
                                        <img src={placeHolderImage} alt="placeholder"/>
                                    </div>
                                    <div>{reservation.header}</div>
                                    <div>Check in date: {reservation.checkInDate}</div>
                                    <div>Check out date: {reservation.checkOutDate}</div>
                                    <div>Number of guests: {reservation.numGuests}</div>
                                    <button onClick={()=> dispatch(deleteReservation(reservation.id))}>Delete Reservation</button>
                                    <button onClick={()=> handleReservationEdit(reservation)}>Edit Reservation</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
    )

}

export default ReservationsIndexPage;