import React from 'react';

interface CatMenuProps {
  catChosen: string;
}

const CatChoice: React.FC<CatMenuProps> = ({ catChosen }) => {
    return(
            <section className='w-full h-full grid place-content-center bg-white hover:bg-sky-200 cursor-pointer transition-colors duration-300'>
              <img className='w-96 h-96 object-cover rounded-full' src={catChosen} alt="" />
            </section>
    )
}

export default CatChoice;