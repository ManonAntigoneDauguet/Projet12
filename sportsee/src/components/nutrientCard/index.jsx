import style from "./nutrientCard.module.css"
import IconCard from "../iconCard"


function NutrientCard({ img, title, data, color }) {
    return (
        <article className={ style.nutrientCard }>
            <div className={ style.nutrientCard__content }>
                <IconCard 
                    img={ img } 
                    alt={ title }
                    color={ color }
                />
                <div className={ style.dataContainer }>
                    <p className={ style.dataValue }>{ data }</p>
                    <p className={ style.dataKey }>{ title }</p>
                </div>
            </div>
        </article>
    )
}

export default NutrientCard