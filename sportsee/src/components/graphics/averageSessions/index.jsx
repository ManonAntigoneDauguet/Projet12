import style from "./averageSessions.module.css"
import { getAverageSessions } from "../../../services/callsAPI"
import { useState, useEffect } from "react"


function AverageSessionsGraph({ userId, isMockedData }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [averageSessions, updateData] = useState()

    const getInformations = async() => {
        const averageSessionsData = await getAverageSessions(userId, isMockedData) 
        if (typeof averageSessionsData === "object") { 
            updateData(averageSessionsData.data)
        } else {
            updateIsError(true)
        }
        updateIsLoadingGet(false)
    }

    useEffect(() => {
        getInformations()
    }, [])

    return (
        <div className={ style.graph__content }>
            { !isLoadingGet && !isError &&
                <div>
                    <h2>Average Graph</h2>    
                    { averageSessions.sessions.map(({ day, sessionLength }) => (
                        <p key={ day }>{ sessionLength }</p>
                    ))}
                </div>
            }
            { isLoadingGet && !isError && <p>En chargement...</p> }
            { !isLoadingGet && isError && <p>Utilisateur introuvable...</p> }
        </div>
    )
}

export default AverageSessionsGraph