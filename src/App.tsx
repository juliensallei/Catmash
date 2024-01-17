// Import assets
import './css/index.css'

// Import hooks
import { useFetch } from './hooks/useFetch';
import { useRandom } from './hooks/useRandom';
import { useEffect, useState } from 'react';

//Import Components
import LoadingScreen from './components/loadingScreen';

function App() {
  //Hooks
  const fetchData = useFetch();

  //States
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [catOne, setCatOne] = useState<string>();
  const [catTwo, setCatTwo] = useState<string>();

  const [alreadyClicked, setAlreadyClicked] = useState<string[]>();


  useEffect(() => {
    const startApp = async () => {
      //Using the hook to fetch...
      const result = await fetchData;

      //When we get all results, callback :
      if (result !== -1) {
        setData(result);
        setLoading(false);

        setCatOne(useRandom(result));
        setCatTwo(useRandom(result));
      }
    };

    startApp();
  }, []);


  console.log(catOne);
  console.log(catTwo);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <main className='w-screen h-screen grid grid-cols-2'>
          
        </main>
      )}
    </>
  )
}

export default App
