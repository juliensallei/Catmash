const CatResult = ({imgUrl, score}: {imgUrl:string, score:number}) => {
    return (
        <div className='flex flex-row m-2'>
            <img className='w-32 h-32 object-cover object-center rounded-full' src={imgUrl} alt="" />
            <span>{score > 0 ? score+' Votes' : "Aucun vote 😞"}</span>
        </div>
    )
}

export default CatResult;