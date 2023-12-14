import style from "./averageSessions.module.css"
import { getAverageSessions } from "../../../services/callsAPI"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';


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

    const renderCustomAxisTick = ({ x, y, payload }) => {
        let dayName = ""
        switch (payload.value) {
            case 1 : 
                dayName = "L"
                break
            case 2 : 
                dayName = "M"
                break
            case 3 : 
                dayName = "M"
                break
            case 4 : 
                dayName = "J"
                break
            case 5 : 
                dayName = "V"
                break
            case 6 : 
                dayName = "S"
                break
            case 7 : 
                dayName = "D"
                break
            default :
                dayName = ""
        }
        return (
        <text x={x+18} y={y+16} dy={-40}>
            {dayName}
        </text>
        )
    }

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={ style.tooltip }>
                    <span>{`${payload[0].value } min`}</span>
                </div>
            )            
        }
        return null
    }

    return (
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Durée moyenne des sessions</h2>
            { !isLoadingGet && !isError &&

                    <LineChart 
                        title="" 
                        width={ 270 } 
                        height={ 263 } 
                        data={ averageSessions.sessions } 
                        className={ style.graph }
                    >
                        <Line 
                            type="monotone" 
                            dataKey="sessionLength" 
                            stroke="#fff" 
                        />
                        <XAxis 
                            dataKey="day" 
                            height={1} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={ renderCustomAxisTick } 
                            className={ style.XAxis }
                        />
                        <YAxis 
                            dataKey="sessionLength" 
                            type="number" 
                            domain={['dataMin-15', 'dataMax+20']} 
                            hide 
                        />
                        <Tooltip 
                            content={ renderCustomTooltip }  
                            
                        />
                    </LineChart>
                
            }
            { isLoadingGet && !isError
                && <p className={ style.errorMessage }>En chargement...</p> 
            }
            { !isLoadingGet && isError 
                && <p className={ style.errorMessage }>Erreur de chargement des données...</p> 
            }
        </div>
    )
}

export default AverageSessionsGraph