import {useState,useEffect} from 'react'

const useFetch = (url) => {

    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error , setError] = useState("");

    useEffect(()=>{
      let isMounted = true;
        const fetchData =async () =>{
            setIsLoading(true);
            try {
                const response = await fetch(url);

                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if(isMounted){
                    setData(result);
                    setIsLoading(false);
                }
               
                
                
                
            } catch (error) {
                if(isMounted){
                    setError(error);
                    setIsLoading(false);
                }
              
            }
           
        }

        fetchData();
        return () =>{ isMounted = false};

    },[url]);

    return {data,isLoading,error}
}

export default useFetch;
