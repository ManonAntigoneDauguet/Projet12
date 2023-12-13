import style from "./activity.module.css"
import { getActivity } from "../../../services/callsAPI"
import { useState, useEffect } from "react"


function ActivityGraph({ userId, isMockedData }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [activity, updateData] = useState()

    const getInformations = async() => {
        const activityData = await getActivity(userId, isMockedData) 
        if (typeof activityData === "object") { 
            updateData(activityData.data.sessions)
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
                    <h2>Activity Graph</h2>    
                    { activity.map(({ day }) => (
                        <p key={ day }>{ day }</p>
                    ))}
                </div>
            }
            { isLoadingGet && !isError && <p>En chargement...</p> }
            { !isLoadingGet && isError && <p>Utilisateur introuvable...</p> }
        </div>
    )
}

export default ActivityGraph