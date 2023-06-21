import './SessionForms.css'
import { useState } from 'react';

const SessionForms = ({signIn}) => {
    const [showSignIn, setShowSignIn] = useState(signIn)

    return(
        <>
            {showSignIn ? (
                <div>Sign In</div>
            ) : (
                <div>Sign Up</div>
            )}
        </>
    )
}

export default SessionForms;



// const SessionModal2 = ({ onClose, onSuccess, SignUp, onModalClose }) => {
//     const [showSignup, setShowSignup] = useState(SignUp);
  
//     return (
//       <Modal onClose={onClose} >
//         <div className="session-modal">
//           <h1>{showSignup ? "Sign Up" : "Log In"}</h1>
//           {showSignup ? (
//             <SignupForm2 onSuccess={onSuccess}/>
//           ): (
//             <LoginForm2 onSuccess={onSuccess}/>
//           )}
//           <button
//             className="link"
//             onClick={() => setShowSignup(prev => !prev)}
//           >
//             {showSignup ? "Log in" : "Sign up"} instead
//           </button>
//         </div>
//       </Modal>
//     );
//   }