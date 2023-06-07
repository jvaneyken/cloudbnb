### Cloudbnb

![Screen Shot 2023-05-29 at 3 58 07 PM](https://github.com/jvaneyken/cloudbnb/assets/31025639/b5995d37-4c7f-41a9-8039-a89058a14581)


- Cloudbnb is an Airbnb clone that utilizes the power and flexibility of React to provide users with a seamless experience. This platform enables users to view a range of listings and make reservations in real time. 
- In a 14 day time frame, my aim was to faithfully recreate the feeling of the well-known Airbnb platform. My goal was to provide visitors with a user-friendly interface and design to ensure a delightful and polished experience.

## Live site 
- [cloudbnb](https://cloudbnb.onrender.com/)
## Discussion of technologies used  List of technologies / libraries / APIs used
- React.js frontend - The user interface was built using the popular javascript library React because of its ability to quickly create fast and modular applications 
 - Rails backend - The backend is powered by Ruby on Rails because its opinionated nature allowed me to focus on core functionality while knowing my application was built on a solid foundation
 - Amazon Web Servies - I used AWS for storing and dynamically retrieving photos because of its reliability ease of use. 
 - JBuilder - A simple Domain Specific Language for connecting the Ruby backend to the React frontend by translating Ruby into a JSON format
 - Faker to generate sample user data

## Code Snippets
### Utilizing state variables to conditionally display a modal
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
