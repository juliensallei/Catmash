/**
 * On passe juste du contenu textuel en prop.
 */
const TopBar = ({content}: {content:string}) => {
    return (
        <nav className='fixed backdrop-blur-md bg-white/30 shadow-lg z-20 top-0 left-0 w-screen text-center font-sans font-extrabold text-2xl p-2'>
          <h1>{content}</h1>
        </nav>
    )
}

export default TopBar;