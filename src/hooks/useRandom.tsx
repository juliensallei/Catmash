type CatList = {
    [key: string]: string;
}

export function useRandom(obj: CatList) { 
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomProperty = obj[randomKey];
    return randomKey;
}