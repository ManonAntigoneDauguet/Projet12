import style from "./navCard.module.css"


function NavCard({ img, alt }) {
    return (
        <a href="/" className={ style.navCard }>
            <img src={ img } alt={ alt } />
        </a>        
    )
}

export default NavCard