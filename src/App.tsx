// Import assets
import './css/index.css'

// Import hooks
import { useFetch } from './hooks/useFetch';
import { useRandom } from './hooks/useRandom';
import { useEffect, useState } from 'react';

//Import Components
import LoadingScreen from './components/loadingScreen';
import CatChoice from './components/catChoice';

function App() {
  //Hooks
  const fetchData = useFetch();

  //States
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [catOne, setCatOne] = useState<string>('');
  const [catTwo, setCatTwo] = useState<string>('');

  const [alreadyPicked, setAlreadyPicked] = useState<string[]>([]);

  useEffect(() => {
    const startApp = async () => {
      //Using the hook to fetch...
      const result = await fetchData;

      //When we get all results, callback :
      if (result !== -1) {
        setData(result);
        setLoading(false);

        const newCatOne = useRandom(result);
        const newCatTwo = useRandom(result, [newCatOne]);

        setCatOne(newCatOne);
        setCatTwo(newCatTwo);
      }
    };

    startApp();
    
  }, []);

  console.log(catOne, catTwo, alreadyPicked, data);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <nav className='absolute top-0 left-0 w-screen text-center font-sans font-extrabold text-2xl p-2'>
            <h1>Choisissez votre chat préféré !</h1>
          </nav>
          <main className='w-screen h-screen grid grid-cols-2'>
            <CatChoice catChosen={data[catOne]} />
            <CatChoice catChosen={data[catTwo]} />
          </main>
        </>
      )}
    </>
  )
}

export default App
