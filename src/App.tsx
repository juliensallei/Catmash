// Imports d'assets
import './css/index.css'

// Import des hooks
import useFetch from './hooks/useFetch';
import useRandom from './hooks/useRandom';
import useAnimation from './hooks/useAnimation';
import { useEffect, useState } from 'react';

//Import des Composants
import LoadingScreen from './components/loadingScreen';
import CatChoice from './components/catChoice';
import TopBar from './components/topBar';
import Footer from './components/footer';
import CatResult from './components/catResult';
import Hearts from './components/hearts';

//Imports redux
import { useSelector, useDispatch } from 'react-redux';
import { increaseScore, subscribeIdToState } from './redux/slice';
import { RootState } from './redux/types';

function App() {
  //Hooks
  const fetchData = useFetch();
  const dispatch = useDispatch();

  //States
  const [data, setData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [catOne, setCatOne] = useState<string>('');
  const [catTwo, setCatTwo] = useState<string>('');

  const [alreadyPicked, setAlreadyPicked] = useState<string[]>([]);

  const [resultMode, setResultMode] = useState<boolean>(false);


  /**
   * Nous utiliserons useEffect pour l'initialisation de l'application.
   * Cet effet charge les données via un hook personnalisé, contenu dans fetchData.
   * Une fois les données récupérées, chaque identifiant de chaque chat sera poussé dans le redux store.
   * Ensuite, nous sélectionnons deux chats au hasard, en nous assurant qu'ils ne sont pas identiques.
   * Lorsque les données sont prêtes et que la promesse asynchrone est remplie, nous faisons basculer l'écran de chargement.
   */
  useEffect(() => {
    const startApp = async () => {
      // On utilise useFetch() pour récupérer les données...
      const result = await fetchData;
      await setLoading(false)

      // Quand on a un résultat :
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
    return;
  }, []);

  //Tableau de classement des scores des chats, stocké dans Redux.
  const catsScores = useSelector((state: RootState) => state.cats.scores);

  /**
   * Une fois le choix effectué, l'identifiant de l'entrée sélectionnée reste dans alreadyPicked.
   * L'entrée est exclue de la sélection aléatoire pendant le nombre de tours indiqué par le seuil.
   */
  const alreadyPickedCleanup = () => {
    const threshold = 10;
    if(alreadyPicked.length > threshold){
      alreadyPicked.shift();
      setAlreadyPicked(alreadyPicked);
    }
  }

  // Click choix numéro 1
  const handleClickFirst = (idElement:string) => {
    /**
     * Traitement des données : On mémorise le choix effectué, et on augmente le score.
     * On transfère le deuxième choix, à la place 1. Puis on choisit un nouveau chat au hasard.
     */
    setAlreadyPicked((alreadyPicked) => [...alreadyPicked, catOne]);
    dispatch(increaseScore(catOne));
    setCatOne(catTwo);
    const newCatTwo = useRandom(data, alreadyPicked);
    setCatTwo(newCatTwo);
    alreadyPickedCleanup();
    // Animations
    useAnimation('clickChoice', idElement);
    useAnimation('heartPop', 'heartOne');
  }

  // Click choix numéro 2
  const handleClickSecond = (idElement:string) => {
    /**
     * Traitement des données : On mémorise le choix effectué, et on augmente le score.
     * Puis on choisit un nouveau chat au hasard.
     */
    setAlreadyPicked((alreadyPicked) => [...alreadyPicked, catTwo]);
    dispatch(increaseScore(catTwo));
    const newCatTwo = useRandom(data, alreadyPicked);
    setCatTwo(newCatTwo);
    alreadyPickedCleanup();
    // Animations
    useAnimation('clickChoice', idElement);
    useAnimation('heartPop', 'heartTwo');
  }

  // Basculement simple entre l'écran de vote et l'écran des résultats.
  const toggleResults = () => {
    resultMode ? setResultMode(false) : setResultMode(true); 
  }
  
  // Retourner l'application, en fonction de l'état d'affichage actif.
  if(loading){
    //LOADING SCREEN
    return <LoadingScreen />;
  } else {
    if(resultMode){
      // PAGE DES RESULTATS
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
      // ECRAN DE VOTE
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
