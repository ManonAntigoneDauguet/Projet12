import style from "./dashboard.module.css"
import React from "react"
import { getUser } from "../../services/callsAPI"
import { formateData } from "../../utils/utilFunctions"
import { useEffect, useState } from "react"
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
    const searchParams = new URLSearchParams(window.location.search)
    const userId = searchParams.get("userId")
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [user, updateUser] = useState()
    const isMockedData = false
    let nutrientCardsContent = []

    const getInformations = async() => {
        const newUser = await getUser(userId, isMockedData) 
        if (typeof newUser === "object") { 
            updateUser(newUser.data)
        } else {
            updateIsError(true)
        }
        updateIsLoadingGet(false)
    }

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
        getInformations()
    }, [])

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
                                isMockedData={ isMockedData}
                            />
                        </div>
                        <div className={ style.graph2 }>
                            <AverageSessionsGraph
                                userId={ userId }
                                isMockedData={ isMockedData}
                            />
                        </div>
                        <div className={ style.graph3 }>
                            <PerformanceGraph
                                userId={ userId }
                                isMockedData={ isMockedData}
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