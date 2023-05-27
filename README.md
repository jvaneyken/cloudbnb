## Brief explanation of what the app is and does   how to play/interact with the project.
- Cloudbnb is an Airbnb clone built using React.js that allows users to view listings and make reservations in real time

## Link to live site 
- [cloudbnb Live](https://cloudbnb.onrender.com/)
## Discussion of technologies used  List of technologies / libraries / APIs used
React.js frontend with a Rails backend. AWS for storing photos. JBuilder. Faker for data, 
## Delve deep into ~2 features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions.
- Utilizing state variables to conditionally display a modal
```js
const [showReviewCreateModal, setShowReviewCreateModal] = useState(false);
```
```js
 return(
        <>
        {showReviewCreateModal && (
            <ReviewCreateModal 
                listingId={listingId}
                closeCreateModal={()=> setShowReviewCreateModal(false)}
                reviews={reviews} />
        )}
```
```js
 { userId !== undefined ?  
            <div>
                <button  id='review-button' onClick={()=> setShowReviewCreateModal(prev => !prev)}>Leave a review</button>
            </div>
            : null }
```

```js
const ReservationsEditModal = ({currentReservation, closeModal}) => {
    // const userId = useSelector(state => state.session.user.id);
    const dispatch = useDispatch()

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
```
## Code snippets to highlight your best code (markdown code snippets, NOT screenshots)       Technical implementation details with (good-looking) code snippets
