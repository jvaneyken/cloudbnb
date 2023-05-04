import './ReviewCreateModal.css'

const ReviewCreateModal = () => {
    

    return(
        <>
            <div>I am the Review Create Modal</div>
            <div>Leave a Review</div>
            <label for="rating">Rating</label>
            <select id='rating'>
                <option value="1" disabled>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4" selected>4</option>
                <option value="5" selected>5</option>
            </select>
            <input type='textarea' />
            <button>Leave Review</button>
        </>
    )
}   

export default ReviewCreateModal;