import style from "./iconCard.module.css"


function IconCard({ img, alt, color }) {
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

    return (
        <a href="/" className={[
            `${ style.iconCard }`, 
            `${colorClass}`
            ].join(' ')}>
            <img 
                src={ img } 
                alt={ alt } 
            />
        </a>        
    )
}

export default IconCard