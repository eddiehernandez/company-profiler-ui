import { useState } from 'react'
import {CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import userPool from '../../utils/userPool'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'


const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    
    const handleSubmit = async (e) => {
        setError(null)
        setIsLoading(true)

        e.preventDefault()
        console.log(email, password)

        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        })

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log('onSuccess: ', data)

                const user = {
                    token: data?.idToken?.jwtToken,
                    email: data?.idToken?.payload?.email
                }
                // save user to local storage
                sessionStorage.setItem('user', JSON.stringify(user))

                //update auth context
                dispatch({type: 'LOGIN', payload: user})

                setIsLoading(false)

            },
            onFailure: (err) => {
                console.error('onFailure:', err)
                setIsLoading(false)
                let errorMessage = '';
                switch (err.name){
                    case 'UserNotConfirmedException':
                        errorMessage = 'Your email has not been confirmed.'
                        break
                    case 'NotAuthorizedException':
                        errorMessage = 'Incorrect email or password specified.'
                        break
                    default:
                        errorMessage = 'Unsuccessful log in attempt.'
                }
                setError(errorMessage)
            },
            newPasswordRequired: (data) => {
                setIsLoading(false)
                console.log('newPasswordRequired: ', data)
            }
        })
    }

    return (

        <main className="text-center form-signin w-100 m-auto" style={{"maxWidth": "330px", "padding": "15px"}}>
            <h1 className="h3 mb-3 fw-normal">Log In</h1>

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

                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>Log In</button>
                <div className="mt-3">To create a free account,<br /><Link to="/signup">sign up</Link> here.</div>
            </form>
        


        </main> 

    )
}
 
export default Login;