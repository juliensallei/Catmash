import React, {MouseEvent} from "react";

interface FooterProps {
    handleClickInParent: (event: MouseEvent<HTMLDivElement>) => void;
    content: string
}

const Footer: React.FC<FooterProps> = ({ handleClickInParent, content }) => {
    return (
        <footer className='fixed bottom-[0vh] left-0 backdrop-blur-md bg-white/30 w-screen text-2xl font-sans font-extrabold p-2'>
          <div onClick={handleClickInParent} className='m-auto w-max cursor-pointer hover:bg-sky-200 p-2 rounded-md transition-colors duration-300'>{content}</div>
        </footer>
    )
}

export default Footer;