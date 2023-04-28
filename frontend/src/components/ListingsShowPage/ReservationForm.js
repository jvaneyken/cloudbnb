import './ReservationForm.css'


const ReservationForm = () => {

    return(
        <>
            <div className="outer-div">
                <div>
                    <div className="reservation-form-price-reviews">
                        <div><span>$99</span><span>night</span></div>
                        <div>478 reviews</div>
                    </div>
                    <div>
                        <form>
                            <input type="text" placeholder="Check in date" />
                            <input type="text" placeholder="Check out date" />
                            <input type="text" placeholder="Number of guests" />
                            <button><span>Reserve</span></button>
                        </form>
                    </div>
                </div>
                <div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                    <div className='reservation-form-b-b-c'>
                        <div>Stuff</div>
                        <div>Other Stuff</div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReservationForm;