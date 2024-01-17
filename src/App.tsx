// Import assets
import './css/index.css'

// Import hooks
import { useFetch } from './hooks/useFetch'
import { useEffect, useState } from 'react';

function App() {
  const fetchData = useFetch();
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const result = await fetchData;

      if (result !== -1) {
        setData(result);
      }
    };

    //fetchDataFromAPI();
  }, []);


  //console.log(data)

  return (
    <>
      <div className="grid place-content-center bg-white w-screen h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default App
