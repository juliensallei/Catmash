import React, {MouseEvent} from 'react';

interface CatChoiceProps {
  handleClickInParent: (event: MouseEvent<HTMLButtonElement>) => void;
  catChosen: string;
}

const CatChoice: React.FC<CatChoiceProps> = ({ handleClickInParent, catChosen }) => {
    return(
            <section onClick={handleClickInParent} className='w-full h-full grid place-content-center bg-white hover:bg-sky-200 cursor-pointer transition-colors duration-300'>
              <img className='w-64 h-64 md:w-96 md:h-96 object-cover object-center rounded-full aspect-square' src={catChosen} alt="" />
            </section>
    )
}

export default CatChoice;