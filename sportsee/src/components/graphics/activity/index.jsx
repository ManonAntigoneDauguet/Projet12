import style from "./activity.module.css"
import { getActivity } from "../../../services/callsAPI"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea, BarChart, Bar, Rectangle, CartesianAxis } from 'recharts'


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
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Activity Graph</h2>
            { !isLoadingGet && !isError &&
                <ResponsiveContainer height="70%" width="100%">
                    <BarChart
                        data={ activity }
                        className={ style.graph }
                    >
                        <CartesianGrid 
                            strokeDasharray="2 2" 
                            horizontal={ true }
                            vertical={ false }
                        />
                        <XAxis 
                            dataKey="day"
                            tickLine={ false } 
                            axisLine={{ stroke: 'gray' }}
                            className={ style.XAxis }
                        />
                        <YAxis 
                            dataKey="kilogram"
                            axisLine={ false } 
                            tickLine={ false } 
                            orientation="right"
                            type="number"
                            // tickCount={ 4 }
                            interval="equidistantPreserveStartEnd"
                            domain={['dataMin-20', 'dataMax']}
                            className={ style.YAxis }
                        />
                        <Legend 
                            verticalAlign="top"
                            align="right"
                        />
                        <Bar 
                            dataKey="kilogram" 
                            fill="rgba(40, 45, 48, 1)"
                        />
                        <Bar 
                            dataKey="calories" 
                            fill="rgba(255, 0, 0, 1)"
                        />
                    </BarChart>
                </ResponsiveContainer>
            }
            { isLoadingGet && !isError 
                && <p className={ style.errorMessage }>En chargement...</p> }
            { !isLoadingGet && isError 
                && <p className={ style.errorMessage }>Erreur de chargement des données...</p> }
        </div>
    )
}

export default ActivityGraph