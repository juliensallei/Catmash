// Import assets
import './css/index.css'

// Import hooks
import useFetch from './hooks/useFetch';
import useRandom from './hooks/useRandom';
import useAnimation from './hooks/useAnimation';
import { useEffect, useState } from 'react';

//Import Components
import LoadingScreen from './components/loadingScreen';
import CatChoice from './components/catChoice';
import TopBar from './components/topBar';
import Footer from './components/footer';
import CatResult from './components/catResult';

import { useSelector, useDispatch } from 'react-redux';
import { increaseScore, subscribeIdToState } from './redux/slice';
import { RootState } from './redux/types';
import Hearts from './components/hearts';

function App() {
  //Hooks
  const fetchData = useFetch();

  //States
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [catOne, setCatOne] = useState<string>('');
  const [catTwo, setCatTwo] = useState<string>('');

  const [alreadyPicked, setAlreadyPicked] = useState<string[]>([]);

  const [resultMode, setResultMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    const startApp = async () => {
      //Using the hook to fetch...
      const result = await fetchData;
      await setLoading(false)

      //When we get all results, callback :
      if (result !== -1) {
        Object.keys(result).forEach((key) => {
          dispatch(subscribeIdToState(key));
        })

        setData(result);

        const newCatOne = useRandom(result);
        const newCatTwo = useRandom(result, [newCatOne]);

        setCatOne(newCatOne);
        setCatTwo(newCatTwo);
      }
    };
    
    startApp();

    return () => {
      isCancelled = true;
    }
  }, []);

  const catsScores = useSelector((state: RootState) => state.cats.scores);

  const alreadyPickedCleanup = () => {
    if(alreadyPicked.length > 10){
      alreadyPicked.shift();
      setAlreadyPicked(alreadyPicked);
    }
  }

  const handleClickFirst = (idElement:string) => {
    setAlreadyPicked((alreadyPicked) => [...alreadyPicked, catOne]);
    dispatch(increaseScore(catOne));
    setCatOne(catTwo);
    const newCatTwo = useRandom(data, alreadyPicked);
    setCatTwo(newCatTwo);
    alreadyPickedCleanup();
    useAnimation('clickChoice', idElement);
    useAnimation('heartPop', 'heartOne');
  }

  const handleClickSecond = (idElement:string) => {
    setAlreadyPicked((alreadyPicked) => [...alreadyPicked, catTwo]);
    dispatch(increaseScore(catTwo));
    const newCatTwo = useRandom(data, alreadyPicked);
    setCatTwo(newCatTwo);
    alreadyPickedCleanup();
    useAnimation('clickChoice', idElement);
    useAnimation('heartPop', 'heartTwo');
  }

  const toggleResults = () => {
    resultMode ? setResultMode(false) : setResultMode(true); 
    useAnimation('fadeResults');
  }
  
  if(loading){
    return <LoadingScreen />;
  } else {
    if(resultMode){
      return (
        <>
          <TopBar content='Voici les résultats :' />
          <main className='relative top-0 left-0 w-96 flex flex-col m-auto mt-32 mb-32'>
            {
              Object.keys(catsScores)
              .sort((id1, id2) => catsScores[id2] - catsScores[id1])
              .map((id) => {
                return <CatResult imgUrl={data[id]} score={catsScores[id]} key={id} />
              })
            }
          </main>
          <Footer handleClickInParent={toggleResults} content="Revenir au vote" />
        </>
      )
    } else {
      return (
        <>
          <TopBar content='Choisissez votre chat préféré !' />
          <Hearts />
          <main className='absolute top-0 left-0 w-screen h-screen grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 '>
            <CatChoice catChosen={data[catOne]} handleClickInParent={() => handleClickFirst('choiceOne')} domId="choiceOne"/>
            <CatChoice catChosen={data[catTwo]} handleClickInParent={() => handleClickSecond('choiceTwo')} domId="choiceTwo"/>
          </main>
          <Footer handleClickInParent={toggleResults} content="Voir les plus beaux chats" />
        </>
      )
    }
  }
}

export default App
