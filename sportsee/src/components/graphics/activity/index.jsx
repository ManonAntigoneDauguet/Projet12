import style from "./activity.module.css"
import { getActivity } from "../../../services/callsAPI"
import { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle } from 'recharts'


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

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={ style.tooltip }>
                    <span>{ `${ payload[0].value }${ payload[0].unit }` }</span>
                    <span>{ `${ payload[1].value }${ payload[1].unit }` }</span>
                </div>
            )            
        }
        return null
    }

    const renderCustomLegend = ({ payload }) => {
        return (
            <ul className={ style.legendContainer } >
                <li style={{ color: `${payload[0].color}` }}>
                    <span style={{ color: "gray", fontSize: "14px" }}>
                        Poids (kg)
                    </span>
                </li>
                <li style={{ color: `${payload[1].color}` }}>
                    <span style={{ color: "gray", fontSize: "14px" }}>
                        Calories brûlées (kCal)
                    </span>
                </li>
          </ul>
        )
    }

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
                            yAxisId="right"
                            orientation="right"
                            tickCount={ 4 }
                            domain={['dataMin-3', "dataMax+3"]}
                            className={ style.YAxis }
                        />
                        <YAxis 
                            dataKey="calories"
                            yAxisId="left"
                            domain={[0, 'dataMax+10']}
                            hide
                        />
                        <Legend 
                            verticalAlign="top"
                            content={ renderCustomLegend }
                        />
                        <Tooltip 
                            content={ renderCustomTooltip }
                            offset={ 45 }
                        />                        
                        <Bar 
                            dataKey="kilogram" 
                            unit="kg"
                            yAxisId="right"
                            fill="rgba(40, 45, 48, 1)"
                            radius={[ 10, 10, 0, 0 ]}
                            barSize={ 8 }
                        />
                        <Bar 
                            dataKey="calories" 
                            unit="Kcal"
                            yAxisId="left"
                            fill="rgba(255, 0, 0, 1)"
                            radius={[ 10, 10, 0, 0 ]}
                            barSize={ 8 }
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