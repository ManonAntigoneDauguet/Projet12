import style from "./iconCard.module.css"


function IconCard({ img, alt, color, link }) {
    let colorClass
    switch (color) {
        case 'red':
            colorClass =  (style.red) 
            break
        case 'blue' :
            colorClass =  (style.blue) 
            break
        case 'yellow' :
            colorClass =  (style.yellow) 
            break
        case 'pink' :
            colorClass =  (style.pink) 
            break
        default :
        colorClass =  (style.white) 
    }

    if (navLink !== undefined) {
        return (
            <a href={ navLink } className={[
                `${ style.iconCard }`, 
                `${colorClass}`
                ].join(' ')}>
                <img 
                    src={ img } 
                    alt={ alt } 
                />
            </a> 
        )
    } else {
        return (
            <div className={[
                `${ style.iconCard }`, 
                `${colorClass}`
                ].join(' ')}>
                <img 
                    src={ img } 
                    alt={ alt } 
                />
            </div> 
        )        
    }
}

export default IconCard