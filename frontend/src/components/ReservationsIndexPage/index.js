import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReservations, deleteReservation } from "../../store/reservations";
import { fetchListings } from "../../store/listings";
import './ReservationsIndexPage.css'
// import reservationsImage from '../../assets/airbnb_reservations_image2.jpg';
// import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg';
import ReservationsEditModal from "../ReservationsEditModal"; 
import {Link} from 'react-router-dom';
import { MdOutlineWavingHand } from 'react-icons/md';


const ReservationsIndexPage = () => {
    const reservations = useSelector((state)=> Object.values(state.reservations));
    const listings = useSelector(state => state.listings);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);


    useEffect(()=> {
        dispatch(fetchListings())
        dispatch(fetchReservations())
    }, [dispatch])

    const [currentReservation, setCurrentReservation] = useState({});

    const handleReservationEdit = (reservation) => {
        setCurrentReservation(reservation);
        setShowModal(prev => !prev);
    }

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }

    return(
            <>
            {showModal && (
                <ReservationsEditModal 
                    currentReservation={currentReservation}
                    closeModal={()=> setShowModal(false)} /> 
            )}
                <div className="reservations-container" >
                    <div>
                        <div className="reservations-trips-header">
                            <h1>Trips</h1>
                        </div>
                        {reservations.length === 0 ? (
                            <div className="trips-heading-div">
                                <div className="no-trips-container">
                                    <div className="no-trips-header">
                                        <div className="no-trips-content">
                                            <div className="waving-hand-icon"><MdOutlineWavingHand /></div>
                                            <h2>No trips booked...yet!</h2>
                                            <div id="no-trips-text">Time to dust off your bags and start planning your next adventure</div>
                                        </div>
                                        <div className="no-trips-header-image">  
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ) : (
                                <div>
                                    {!isEmpty(listings) && reservations.map((reservation) => (
                                        <div className="reservations-div" key={reservation.id}>
                                            <Link className="reservations-link" to={`listings/${reservation.listingId}`}>
                                                <img src={isEmpty(listings) === false ? listings[reservation.listingId].photoUrls[0] : ""} alt="placeholder"/>
                                            </Link>
                                            <div className="reservations-details">
                                                <Link className='reservations-title-link' to={`listings/${reservation.listingId}`}>
                                                    <div>{reservation.header}</div>
                                                </Link>
                                                <div>Check in date: {new Date(reservation.checkInDate).toLocaleDateString("en-US",{
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    timeZone: 'UTC'
                                                })}</div>
                                                <div>Check out date: {new Date(reservation.checkOutDate).toLocaleDateString("en-US",{
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    timeZone: 'UTC'
                                                })}</div>
                                                <div>Number of guests: {reservation.numGuests}</div>
                                            </div>
                                            <div className="reservations-div-buttons">
                                                <button onClick={()=> dispatch(deleteReservation(reservation.id))}>Delete</button>
                                                <button onClick={()=> handleReservationEdit(reservation)}>Update</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )
                            }
                    </div>
                </div>
            </>
    )
}

export default ReservationsIndexPage;