import style from "./verticalBar.module.css"
import IconCard from "../../components/iconCard"
import cyclingImg from "../../assets/cycling.svg"
import bodybuildingImg from "../../assets/bodybuilding.svg"
import meditationImg from "../../assets/meditation.svg"
import swimmingImg from "../../assets/swimming.svg"


const iconCardsContent = [
    {
        "id": 1,
        "alt": "méditation",
        "img": { meditationImg }
    },
    {
        "id": 2,
        "alt": "natation",
        "img": { swimmingImg }
    },
    {
        "id": 3,
        "alt": "cyclisme",
        "img": { cyclingImg }
    },
    {
        "id": 4,
        "alt": "musculation",
        "img": { bodybuildingImg }
    }
]

function VerticalBar() {
    return (
        <div className={ style.verticalBar }>
            <nav aria-label="nav-2">
                { iconCardsContent.map(({ id, alt, img }) => (
                    <IconCard
                        key={ id }
                        img={ Object.values(img) }
                        alt={ alt }
                    />                  
                )) }
            </nav>
            <div className={ style.copyrithContainer }>
                <span>Copyright, SportSee 2020</span>                
            </div>                
        </div>
    )
}

export default VerticalBar