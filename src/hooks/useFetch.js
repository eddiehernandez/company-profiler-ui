import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user, dispatch } = useAuthContext()

  useEffect(() => {

    const abortController = new AbortController()

    if (user){

        setError(null)
        setIsPending(true)
        fetch(url, {
            signal: abortController.signal,
            headers: {
                'Authorization': `Bearer ${user?.token}`                
            }
         })
        .then(res => {
            if (!res.ok) { // error coming back from server
                if (res.status === 401){
                    console.log('looks like you are not authorized.')
                    sessionStorage.removeItem('user')
                    dispatch({type: 'LOGOUT'})

                }
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err => {
            if (err.name === 'AbortController'){
                console.log('fetch aborted.')
            }
            else {
                setIsPending(false);
                setError(err.message);
            }
        })        
    }

    return () => abortController.abort()
  }, [url, user, dispatch])

  return { data, isPending, error };
}
 
export default useFetch;