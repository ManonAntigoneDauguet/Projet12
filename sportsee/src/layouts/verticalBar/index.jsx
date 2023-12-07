import style from "./verticalBar.module.css"
import NavCard from "../../components/navCard"
import cyclingImg from "../../assets/cycling.svg"
import bodybuildingImg from "../../assets/bodybuilding.svg"
import meditationImg from "../../assets/meditation.svg"
import swimmingImg from "../../assets/swimming.svg"


function VerticalBar() {
    return (
        <div className={ style.verticalBar }>
            <nav aria-label="nav-2">
                <NavCard
                    img={ meditationImg }
                    alt="méditation"
                />
                <NavCard 
                    img={ swimmingImg }
                    alt="natation"
                />
                <NavCard 
                    img={ cyclingImg }
                    alt="cyclisme"
                />
                <NavCard 
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