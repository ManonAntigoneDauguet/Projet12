import style from "./dashboard.module.css"
import NutrientCard from "../../components/nutrientCard"
import calorieImg from "../../assets/energy.svg"
import proteinImg from "../../assets/chicken.svg"
import glucidImg from "../../assets/apple.svg"
import lipidImg from "../../assets/cheeseburger.svg"


const nutrientCardsContent = [
    {
        "id": 1,
        "title": "Calories",
        "img": { calorieImg },
        "color": "red"
    },
    {
        "id": 2,
        "title": "Protéines",
        "img": { proteinImg },
        "color": "blue"
    },
    {
        "id": 3,
        "title": "Glucides",
        "img": { glucidImg },
        "color": "yellow"
    },
    {
        "id": 4,
        "title": "Lipides",
        "img": { lipidImg },
        "color": "pink"
    }
]


function Dashboard() {
    return (
        <div className={ style.dashboard }>
            <div className={ style.dashboard__content }>
                <section>
                    <h1>Bonjour <span className={ style.userName }>Name</span></h1>
                    <span className={ style.personalizedMessage }>Personnal message</span>                   
                </section>
                <section className={ style.dataContainer }>
                    <div className={ style.nutrientCards }>
                        {nutrientCardsContent.map(({ id, title, img, color }) => (
                            <NutrientCard 
                                key={ id }
                                img={ Object.values(img) }
                                title={ title }
                                color={ color }
                            /> 
                        )) }                   
                    </div>
                    <div className={ style.graph1 }></div>
                    <div className={ style.graph2 }></div>
                    <div className={ style.graph3 }></div>
                    <div className={ style.graph4 }></div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard