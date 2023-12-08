import style from "./iconCard.module.css"


function IconCard({ img, alt }) {
    return (
        <a href="/" className={ style.iconCard }>
            <img src={ img } alt={ alt } />
        </a>        
    )
}

export default IconCard