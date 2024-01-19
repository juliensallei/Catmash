import heartSvg from '../assets/heart.svg'

const Hearts = () => {
    return (
        <div className='absolute z-10 top-0 left-0 w-screen h-screen grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 pointer-events-none'>
            <div className='w-full h-full grid place-content-center'>
                <img id='heartOne' className='w-96 scale-0' src={heartSvg} alt="" />
            </div>
            <div className='w-full h-full grid place-content-center'>
                <img id='heartTwo' className='w-96 scale-0' src={heartSvg} alt="" />
            </div>
        </div>
    )
}

export default Hearts;