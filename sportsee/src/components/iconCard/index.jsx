import style from "./iconCard.module.css"


/**
 * Return a image as a anchor or a card
 * @param { String } img
 * @param { String } alt
 * @param { String } [color]
 * @param { String } [navLink] as the path of Router
 * @returns { HTMLElement }
 */
function IconCard({ img, alt, color, navLink }) {
    let colorClass
    switch ( color ) {
        case 'red':
            colorClass = ( style.red )
            break
        case 'blue':
            colorClass = ( style.blue )
            break
        case 'yellow':
            colorClass = ( style.yellow )
            break
        case 'pink':
            colorClass = ( style.pink )
            break
        default:
            colorClass = ( style.white )
    }

    return (
        navLink !== undefined ? 
            <a
                href={ navLink }
                className={ `${style.iconCard} ${colorClass}` }>
                <img src={ img } alt={ alt } />
            </a> 
            : <div className={ `${style.iconCard} ${colorClass}` }>
                <img src={ img } alt={ alt } />
            </div>
    )
}

export default IconCard