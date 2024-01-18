type CatList = {
    [key: string]: string;
}

export function useRandom(obj: CatList, exclude?: string[]) { 
    const keys:string[] = Object.keys(obj);
    let filteredKeys: string[] = keys;

    if (exclude && exclude.length > 0) {
        filteredKeys = keys.filter(key => !exclude.includes(obj[key]));
    }

    const randomIndex = Math.floor(Math.random() * filteredKeys.length);
    const randomKey = filteredKeys[randomIndex];

    const randomProperty = obj[randomKey];
    return randomKey;
}