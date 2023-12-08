import style from "./verticalBar.module.css"
import IconCard from "../../components/iconCard"
import cyclingImg from "../../assets/cycling.svg"
import bodybuildingImg from "../../assets/bodybuilding.svg"
import meditationImg from "../../assets/meditation.svg"
import swimmingImg from "../../assets/swimming.svg"


function VerticalBar() {
    return (
        <div className={ style.verticalBar }>
            <nav aria-label="nav-2">
                <IconCard
                    img={ meditationImg }
                    alt="méditation"
                />
                <IconCard 
                    img={ swimmingImg }
                    alt="natation"
                />
                <IconCard 
                    img={ cyclingImg }
                    alt="cyclisme"
                />
                <IconCard 
                    img={ bodybuildingImg }
                    alt="musculation"
                />
            </nav>
            <div className={ style.copyrithContainer }>
                <span>Copyright, SportSee 2020</span>                
            </div>                
        </div>
    )
}

export default VerticalBar