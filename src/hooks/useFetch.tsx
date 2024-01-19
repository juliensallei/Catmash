interface JsonStructure {
    images: CatList[]
}

interface CatList {
    url: string,
    id: string
}

/**
 * Ce hook récupère les données de l'api.
 * Après cela, il analyse les données et renvoie un objet record.
 * Cela nous permet d'avoir un identifiant unique pour cibler chaque entrée individuellement.
 * Si la promesse échoue, nous renvoyons une erreur.
 */
const useFetch = async () => {
    try {
        const data:Response = await fetch('https://conseil.latelier.co/data/cats.json');
        const res: JsonStructure = await data.json();
        
        const dataList: CatList[] = res.images;
       
        const catsArray: Record<string, string> = {};

        dataList.forEach((item:CatList) => {
            catsArray[item.id] = item.url;
        })

        return catsArray;
    } catch (error) {
        console.log('Fetch error: ', error);
        return -1;
    }
}

export default useFetch;