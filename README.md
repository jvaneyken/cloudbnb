# Cloudbnb


![Screen Shot 2023-05-29 at 3 58 07 PM](https://github.com/jvaneyken/cloudbnb/assets/31025639/b5995d37-4c7f-41a9-8039-a89058a14581)

## Live site 
- [cloudbnb](https://cloudbnb.onrender.com/)

## About

- Cloudbnb is an Airbnb clone that utilizes the power and flexibility of React to provide users with a seamless experience. This platform enables users to view a range of listings and make reservations and leave reviews in real time. 
- In a 14 day time frame, my aim was to faithfully recreate the feeling of the well-known Airbnb platform. My goal was to provide visitors with a user-friendly interface and design to ensure a delightful and polished experience.


## List of technologies used
- React.js frontend - The user interface was built using the popular javascript library React because of its ability to quickly create fast and modular applications 
- Rails backend - The backend is powered by Ruby on Rails. Its opinionated nature allowed me to focus on core functionality while knowing my application was built on a solid foundation
- Amazon Web Servies - I used AWS for storing and dynamically retrieving photos because of its reliability and ease of use. 
- JBuilder - A simple Domain Specific Language for connecting the Ruby backend to the React frontend by translating Ruby into a JSON format
- Faker - Library for generating fake data. Used in this project for sample user data
- Render - hosting
- PostgreSQL - Database

## Home Page
<img src="https://github.com/jvaneyken/cloudbnb/assets/31025639/d16fc975-d0b7-4608-8e05-a5f5fb68d2cb">

## Make a Reservation
# ![Making a Reservation](readme_images/Make_Reservation.gif)

## Leave a Review
# ![Leaving a review](readme_images/leave_a_review.gif)

## Code Snippets
### Creating a Review
**Below is the code for checking if the current user has left a review on this listing and, if not, creating a review object and dispatching it to the backend**
```js
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');

    const handleClick = () => {
        const newReview = {userId, rating, body, listingId}
        dispatch(createReview(newReview));
        closeCreateModal();
    }

    const reviewExists =
     reviews.some(listingReview => listingReview.userId === userId);

return(
        <> 
            { reviewExists ? (
                <div id='review-create-modal-background'>
                <div id='review-create-modal'>
                    <div id='review-create-modal-content'>
                        <div id='review-already-left'>You have already left a Review!</div>
                        <button onClick={() => closeCreateModal()}>Ok</button>
                    </div>
                </div>
            </div>
            ) : (
                <div id='review-create-modal-background'>
                    <div id='review-create-modal'>
                        <div id='review-create-modal-content'>
                            <div id='review-create-title'>Leave a Review!</div>
                            <select onChange={((e)=> setRating(e.target.value))} id='review-create-rating'>
                                <option selected disabled>Choose a rating</option>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                            </select>
                            <textarea onChange={((e)=> setBody(e.target.value))}
                            id='review-create-text'
                            />
                            <button onClick={handleClick}>Leave Review</button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
```
