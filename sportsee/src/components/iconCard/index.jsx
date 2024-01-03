import style from "./iconCard.module.css"


/**
 * Return a image as a anchor or a card
 * @param { String } img
 * @param { String } alt
 * @param { String } [color="white"]
 * @param { String } [navLink] as the path of Router
 * @returns { HTMLElement }
 */
function IconCard({ img, alt, color = "white", navLink }) {
    let colorClass = 
        {
            "red": style.red,
            "blue": style.blue,
            "yellow": style.yellow,
            "pink": style.pink,
            "white": style.white
        }

    return (
        navLink !== undefined ? 
            <a
                href={ navLink }
                className={ `${style.iconCard} ${colorClass[color]}` }>
                <img src={ img } alt={ alt } />
            </a> 
            : <div className={ `${style.iconCard} ${colorClass[color]}` }>
                <img src={ img } alt={ alt } />
            </div>
    )
}

export default IconCard