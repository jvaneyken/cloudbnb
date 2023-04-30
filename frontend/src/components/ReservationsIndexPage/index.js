import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReservations } from "../../store/reservations";
import './ReservationsIndexPage.css'
import placeHolderImage from '../../assets/deric-0zy0QwHwZy8-unsplash.jpg'
import {Link} from 'react-router-dom';



const ReservationsIndexPage = () => {
    const reservations = useSelector((state)=> Object.values(state.reservations));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchReservations());
    }, [dispatch])

    return(
        <>
            <h1>Reservations Index Page</h1>
            <div className="reservations-container">
                {reservations.map((reservation) => (
                    <div>{reservation.check_in_date}</div>
                ))}
            </div>
        </>
    )

}

export default ReservationsIndexPage;