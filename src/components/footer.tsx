import React, {MouseEvent} from "react";

/**
 * Ici, nous transmettons l'événement qui nous permet de basculer entre le vote et les résultats.
 * Sinon, uniquement du contenu textuel.
 */
interface FooterProps {
    handleClickInParent: (event: MouseEvent<HTMLDivElement>) => void;
    content: string
}

const Footer: React.FC<FooterProps> = ({ handleClickInParent, content }) => {
    return (
        <footer className='fixed z-20 bottom-[0vh] left-0 backdrop-blur-md bg-white/30 w-screen text-2xl font-sans font-extrabold p-2'>
          <div onClick={handleClickInParent} className='m-auto w-max cursor-pointer hover:bg-sky-200 p-2 rounded-md transition-colors duration-300'>{content}</div>
        </footer>
    )
}

export default Footer;