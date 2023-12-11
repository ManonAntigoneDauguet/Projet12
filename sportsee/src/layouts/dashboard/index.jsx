import style from "./dashboard.module.css"
import mockedData from "../../mockedData/userMocked.json"
import React from "react"
import getUser from "../../services/callsAPI"
import NutrientCard from "../../components/nutrientCard"
import calorieImg from "../../assets/energy.svg"
import proteinImg from "../../assets/chicken.svg"
import glucidImg from "../../assets/apple.svg"
import lipidImg from "../../assets/cheeseburger.svg"
import { useEffect, useState } from "react"


function formateData(data) {
    data = Array.from(String(data))
    let length = data.length
    if (length > 3) {
        data.splice(length - 3, 0, ",")
        data.push("k")
    }
    return data.join('')
}

function Dashboard() {
    const [isLoadingGet, updateIsLoadingGet] = useState(false)
    const [user, updateUser] = useState(mockedData.data)

    const getInformations = async() => {
        updateIsLoadingGet(true)
        const newUser = await getUser(12) 
        if (typeof newUser === "object") { 
            updateUser(newUser.data)
        }
        updateIsLoadingGet(false)
    }
    const nutrientCardsContent = [
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

    useEffect(() => {
        getInformations()
    }, [])

    return (
        <div className={ style.dashboard }>
            { !isLoadingGet ?
                <div className={ style.dashboard__content }>
                    <section>
                        <h1>Bonjour <span className={ style.userName }>{ user.userInfos.firstName }</span></h1>
                        <span className={ style.personalizedMessage }>Personnal message</span>                   
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
                        <div className={ style.graph1 }></div>
                        <div className={ style.graph2 }></div>
                        <div className={ style.graph3 }></div>
                        <div className={ style.graph4 }></div>
                    </section>
                </div>
            : <p>Chargement....</p>}
        </div>
    )
}

export default Dashboard