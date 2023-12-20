import style from "./dashboard.module.css"
import React from "react"
import { formateData } from "../../utils/utilFunctions"
import { formatUser } from "../../services/dataFormatter.service"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
// assets
import calorieImg from "../../assets/energy.svg"
import proteinImg from "../../assets/chicken.svg"
import glucidImg from "../../assets/apple.svg"
import lipidImg from "../../assets/cheeseburger.svg"
// components
import NutrientCard from "../../components/nutrientCard"
import ActivityGraph from "../../components/graphics/activity"
import ScoreGraph from "../../components/graphics/score"
import AverageSessionsGraph from "../../components/graphics/averageSessions"
import PerformanceGraph from "../../components/graphics/performance"


function Dashboard() {
    const { userId } = useParams()
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [user, updateUser] = useState()
    let nutrientCardsContent = []

    if (typeof user === "object") {
        nutrientCardsContent = [
            {
                "id": 1,
                "title": "Calories",
                "img": { calorieImg },
                "color": "red",
                "data": `${ user.keyData.calorieCount }`,
                "unit": "Cal"
            },
            {
                "id": 2,
                "title": "Protéines",
                "img": { proteinImg },
                "color": "blue",
                "data": `${ user.keyData.proteinCount }`,
                "unit": "g"
            },
            {
                "id": 3,
                "title": "Glucides",
                "img": { glucidImg },
                "color": "yellow",
                "data": `${ user.keyData.carbohydrateCount }`,
                "unit": "g"
            },
            {
                "id": 4,
                "title": "Lipides",
                "img": { lipidImg },
                "color": "pink",
                "data": `${ user.keyData.lipidCount }`,
                "unit": "g"
            }
        ]        
    }

    useEffect(() => {
        const getInformations = async() => {
            const newUser = await formatUser(userId) 
            if (typeof newUser === "object") { 
                updateUser(newUser)
            } else {
                updateIsError(true)
            }
            updateIsLoadingGet(false)
        }
        getInformations()
    }, [ userId ])

    return (
        <div className={ style.dashboard }>
            { !isLoadingGet && !isError &&
                <div className={ style.dashboard__content }>
                    <section>
                        <h1>Bonjour <span className={ style.userName }>{ user.userInfos.firstName }</span></h1>
                        <span className={ style.personalizedMessage }>Félicitations ! Vous avez explosé vos objectifs hier 👏</span>                  
                    </section>
                    <section className={ style.dataContainer }>
                        <div className={ style.nutrientCards }>
                            {nutrientCardsContent.map(({ id, title, img, color, data, unit }) => (
                                <NutrientCard 
                                    key={ id }
                                    img={ Object.values(img) }
                                    title={ title }
                                    color={ color }
                                    data={[`${ formateData(data) }`, `${ unit }`].join('')}
                                /> 
                            )) }                   
                        </div>
                        <div className={ style.graph1 }>
                            <ActivityGraph
                                userId={ userId }
                            />
                        </div>
                        <div className={ style.graph2 }>
                            <AverageSessionsGraph
                                userId={ userId }
                            />
                        </div>
                        <div className={ style.graph3 }>
                            <PerformanceGraph
                                userId={ userId }
                            />
                        </div>
                        <div className={ style.graph4 }>
                            <ScoreGraph
                                score={ user.score ? user.score : user.todayScore }
                            />
                        </div>
                    </section>
                </div>
            }
            { isLoadingGet && !isError && <p>En chargement...</p> }
            { !isLoadingGet && isError && <p>Utilisateur introuvable...</p> }
        </div>
    )
}

export default Dashboard