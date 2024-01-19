import React, {MouseEvent} from 'react';
import useAnimation from '../hooks/useAnimation'

/**
 * Cette interface relie l'état de gestion de l'événement de clic dans le code parent (App.tsx).
 * La raison en est une meilleure gestion de l'état.
 * L'événement n'est "propdrilled" qu'une seule fois.
 * De plus, nous transmettons toutes les données affichées du composant racine à ce composant.
 */
interface CatChoiceProps {
  handleClickInParent: (event: MouseEvent<HTMLButtonElement>) => void;
  catChosen: string;
  domId: string;
}

const CatChoice: React.FC<CatChoiceProps> = ({ handleClickInParent, catChosen, domId }) => {
    //ANIMATIONS
    const handleEnter = (id:string) => {
      useAnimation('hoverChoice', id)
    }

    const handleLeave = (id:string) => {
      useAnimation('unHoverChoice', id)
    }

    return(
            <section
              onMouseEnter={() => handleEnter(domId)}
              onMouseLeave={() => handleLeave(domId)}
              onClick={handleClickInParent}
              className='w-full h-full grid place-content-center bg-white hover:bg-sky-200 cursor-pointer transition-colors duration-300'>
              <img id={domId} className='w-64 h-64 md:w-96 md:h-96 object-cover object-center rounded-full aspect-square' src={catChosen} alt="" />
            </section>
    )
}

export default CatChoice;