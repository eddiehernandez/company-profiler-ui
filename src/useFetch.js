import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cacheName = 'companySearchList';
    const cachedData = localStorage.getItem(cacheName);
    // console.log(cachedData);
    if (cachedData) {
      console.log('loading company list from local storage')
      setData(JSON.parse(cachedData));
      setIsPending(false);
      setError(null);
    }
    else {
      fetch(url)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        console.log('received company list from api');
        setIsPending(false);
        setData(data);
        localStorage.setItem(cacheName, JSON.stringify(data))
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }


  // }, [url, cacheName])
  }, [url])
  return { data, isPending, error };
}
 
export default useFetch;