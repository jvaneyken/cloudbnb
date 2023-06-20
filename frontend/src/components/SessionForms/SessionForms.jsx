import './SessionForms.css'
// import { useState } from 'react';

const SessionForms = ({signIn}) => {

    return(
        <>
            {signIn ? (
                <div>Sign In</div>
            ) : (
                <div>Sign Up</div>
            )}
        </>
    )
}

export default SessionForms;