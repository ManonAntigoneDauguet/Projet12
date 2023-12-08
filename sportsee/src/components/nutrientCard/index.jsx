import style from "./nutrientCard.module.css"
import IconCard from "../iconCard"
import img from "../../assets/cycling.svg"


function NutrientCard() {
    return (
        <article className={ style.nutrientCard }>
            <div className={ style.nutrientCard__content }>
                <IconCard img={ img } />
                <div className={ style.dataContainer }>
                    <p className={ style.dataValue }>???</p>
                    <p className={ style.dataKey }>???</p>
                </div>
            </div>
        </article>
    )
}

export default NutrientCard