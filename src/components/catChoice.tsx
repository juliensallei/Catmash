import React, {MouseEvent} from 'react';

interface CatChoiceProps {
  handleClickInParent: (event: MouseEvent<HTMLButtonElement>) => void;
  catChosen: string;
}

const CatChoice: React.FC<CatChoiceProps> = ({ handleClickInParent, catChosen }) => {
    return(
            <section onClick={handleClickInParent} className='w-full h-full grid place-content-center bg-white hover:bg-sky-200 cursor-pointer transition-colors duration-300'>
              <img className='w-96 h-96 object-cover object-center rounded-full' src={catChosen} alt="" />
            </section>
    )
}

export default CatChoice;