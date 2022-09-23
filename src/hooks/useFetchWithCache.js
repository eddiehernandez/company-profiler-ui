import { useState, useEffect } from 'react';

const useFetch = (url, cacheName) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const abortController = new AbortController()
    let cachedData = JSON.parse(sessionStorage.getItem(cacheName))
    setData(null) //reset data for next fetch
    if (cachedData?.created){
        //if expired remove from local storage and reset cachedData
        const expirationLapses = 1000 * 60 * 60 * 24; // 24 hrs in ms
        console.log('checking expiration...')
        const now = new Date();
        let expirationDateTime = new Date(cachedData.created)
        expirationDateTime.setTime(expirationDateTime.getTime() + expirationLapses)


        if (now > expirationDateTime){
            console.log(`clearing session ${cacheName}`)
            sessionStorage.removeItem(cacheName)
            cachedData = null
        }
    }

    if (cachedData?.data){
        console.log(`loading ${cacheName} data from session storage`)
        setIsPending(false);
        setData(cachedData.data)
        setError(null)
    }
    else {
        setIsPending(true)
        setError(null)
        console.log(`fetching ${url}`)
        fetch(url, { signal: abortController.signal })
        .then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            cachedData = {
                data: data,
                created: new Date()
            }
            sessionStorage.setItem(cacheName, JSON.stringify(cachedData))
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
  }, [url, cacheName])

  return { data, isPending, error };
}
 
export default useFetch;