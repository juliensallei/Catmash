import React, {MouseEvent} from 'react';
import useAnimation from '../hooks/useAnimation'

interface CatChoiceProps {
  handleClickInParent: (event: MouseEvent<HTMLButtonElement>) => void;
  catChosen: string;
}

const CatChoice: React.FC<CatChoiceProps> = ({ handleClickInParent, catChosen }) => {
    const handleEnter = (id:string) => {
      useAnimation('hoverChoice', id)
    }

    return(
            <section onMouseEnter={() => handleEnter(catChosen)} onClick={handleClickInParent} className='w-full h-full grid place-content-center bg-white hover:bg-sky-200 cursor-pointer transition-colors duration-300'>
              <img id={catChosen} className='w-64 h-64 md:w-96 md:h-96 object-cover object-center rounded-full aspect-square' src={catChosen} alt="" />
            </section>
    )
}

export default CatChoice;