import style from "./performance.module.css"
import { getPerformance } from "../../../services/callsAPI"
import { useState, useEffect } from "react"


function PerformanceGraph({ userId, isMockedData }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [performance, updateData] = useState()

    const getInformations = async() => {
        const performanceData = await getPerformance(userId, isMockedData) 
        if (typeof performanceData === "object") { 
            updateData(performanceData.data)
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
                    <h2>Performance Graph</h2>    
                    { performance.data.map(({ kind, value }) => (
                        <p key={ kind }>{ value }</p>
                    ))}
                </div>
            }
            { isLoadingGet && !isError && <p>En chargement...</p> }
            { !isLoadingGet && isError && <p>Utilisateur introuvable...</p> }
        </div>
    )
}

export default PerformanceGraph