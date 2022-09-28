import { useState } from 'react'
import userPool from '../../utils/userPool'
import { Link } from 'react-router-dom'


const Signup = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [userCreated, setUserCreated] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const handleSubmit = async (e) => {
        setError(null)
        setUserCreated(null)
        setIsLoading(true)
        e.preventDefault()
        console.log(email, password)
        userPool.signUp(email, password, [], null, (err, data) => {
            
            if (err) {
                let errorMessage = ''
                switch (err.name) {
                    case "UsernameExistsException":
                        errorMessage = "User with that name already exists."
                        break

                    case "InvalidParameterException":
                        errorMessage = "Invalid email or password entered."
                        break

                    default:
                        errorMessage = 'Unexpected error occurred while signing up.'
                }
                
                        
                console.log(`Error Name: ${err.name}`)
                console.log(`Error message = ${err.message}`)
                setError(errorMessage)
            }    
            else {
                setUserCreated(true)
                console.log(data)
            }
            setIsLoading(false)

        })

    }


    return (

        <main className="text-center form-signin w-100 m-auto" style={{"maxWidth": "330px", "padding": "15px"}}>
            <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
            {!userCreated && 
                <form onSubmit={handleSubmit}>
                    { error && <div className="alert alert-danger" role="alert">{error}</div>}

                    <div className="form-floating">
                        <input type="email" onChange={e => setEmail(e.target.value)} value={email} className="form-control" id="floatingInput" placeholder="name@example.com" style={{"marginBottom": "10px", "borderTopLeftRadius": "0", "borderTopRightRadius": "0"}}/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    
                    <div className="form-floating">
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} className="form-control" id="floatingPassword" placeholder="Password" style={{"marginBottom": "10px", "borderTopLeftRadius": "0", "borderTopRightRadius": "0"}} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>Sign Up</button>
                    <div className="mt-3">If you already have an account,<br /><Link to="/login">log in</Link> here.</div>
                </form>
        
            }

            {userCreated && <div className="alert alert-info" role="alert">
                <p className="lead">User has been created successfully.</p>
                <p>Please check your email inbox and click on the confirmation link to confirm your e-mail.</p>  
                <p>After confirmation, feel free to <Link to="/login">login</Link>.</p></div>}

        </main> 

    )
}
 
export default Signup;