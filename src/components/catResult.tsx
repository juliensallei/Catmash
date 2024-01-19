const CatResult = ({imgUrl, score}: {imgUrl:string, score:number}) => {
    return (
        <div className='flex flex-row m-2'>
            <img className='w-32 h-32 object-cover object-center rounded-full aspect-square' src={imgUrl} alt="" />
            <div className="grid w-full h-32 place-content-center ">
                <span className="w-full h-full font-sans font-extrabold text-xl">{score == 1 ? score+' Vote' : score > 1 ? score+' Votes': "Aucun vote 😞"}</span>
            </div>
        </div>
    )
}

export default CatResult;