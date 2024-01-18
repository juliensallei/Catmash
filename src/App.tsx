// Import assets
import './css/index.css'

// Import hooks
import { useFetch } from './hooks/useFetch';
import { useRandom } from './hooks/useRandom';
import { useEffect, useState } from 'react';

//Import Components
import LoadingScreen from './components/loadingScreen';
import CatChoice from './components/catChoice';
import TopBar from './components/topBar';
import Footer from './components/footer';

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

  const handleClickFirst = () => {
    setAlreadyPicked((alreadyPicked) => [...alreadyPicked, catOne]);
    setCatOne(catTwo);
    const newCatTwo = useRandom(data, alreadyPicked);
    setCatTwo(newCatTwo);
  }

  const handleClickSecond = () => {
    setAlreadyPicked((alreadyPicked) => [...alreadyPicked, catTwo]);
    const newCatTwo = useRandom(data, alreadyPicked);
    setCatTwo(newCatTwo);
  }

  const toggleResults = () => {
    console.log('results');
  }

  if(loading){
    return <LoadingScreen />;
  } else {
    return (
      <>
        <TopBar />
        <main className='w-screen h-screen grid grid-cols-2'>
          <CatChoice catChosen={data[catOne]} handleClickInParent={handleClickFirst}/>
          <CatChoice catChosen={data[catTwo]} handleClickInParent={handleClickSecond}/>
        </main>
        <Footer handleClickInParent={toggleResults} />
      </>
    )
  }
}

export default App
