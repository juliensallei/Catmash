import React, {MouseEvent} from "react";

interface FooterProps {
    handleClickInParent: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Footer: React.FC<FooterProps> = ({ handleClickInParent }) => {
    return (
        <footer className='absolute bottom-0 left-0 backdrop-blur-md bg-white/30 w-screen text-2xl font-sans font-extrabold p-2'>
          <div onClick={handleClickInParent} className='block m-auto w-max cursor-pointer hover:bg-sky-200 p-2 rounded-md transition-colors duration-300'>Voir les plus beaux chats</div>
        </footer>
    )
}

export default Footer;