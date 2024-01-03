import style from "./averageSessions.module.css"
import { formatAverageSessions } from "../../../services/dataFormatter.service"
import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts'


/**
 * Return the AverageSessions's line chart
 * @param { Number } userId
 * @returns { HTMLElement }
 */
function AverageSessionsGraph({ userId }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [averageSessions, updateData] = useState()

    useEffect(() => {
        const getInformations = async() => {
            try {
                updateData( await formatAverageSessions(userId) )
            } catch ( error ) {
                updateIsError(true)
            }
            updateIsLoadingGet(false)
        }        
        getInformations()
    }, [ userId ])

    const renderCustomAxisTick = ({ x, y, payload }) => {
        return (
            <text x={ x+16 } y={ y+16 } dy={ -40 }>
                { payload.value }
            </text>
        )
    }

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={ style.tooltip }>
                    <span>{ `${ payload[0].value } min` }</span>
                </div>
            )            
        }
        return null
    }

    return (
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Durée moyenne des sessions</h2>
            { !isLoadingGet && !isError &&
                <ResponsiveContainer height="100%" width="104%">
                    <LineChart 
                        data={ averageSessions } 
                        className={ style.graph }
                    >
                    <defs>
                        <linearGradient 
                            id="colorUv" 
                            x1="0%" 
                            y1="0%" 
                            x2="100%" 
                            y2="0%"
                        >
                            <stop 
                                offset="0%" 
                                stopColor="white" 
                                stopOpacity={ 0.3 } 
                            />
                            <stop 
                                offset="100%" 
                                stopColor="white" 
                                stopOpacity={ 1 } 
                            />
                        </linearGradient>
                    </defs>    
                        <Line 
                            type="monotone" 
                            dataKey="sessionLength" 
                            fill= "none"
                            stroke="url(#colorUv)"
                            strokeWidth={ 2 }
                            dot={ false }
                            activeDot={{ fill: "white", strokeWidth: "1px" }}
                            strokeLinecap="round"
                        />
                        <XAxis 
                            dataKey="day" 
                            height={ 1 } 
                            axisLine={ false } 
                            tickLine={ false } 
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
                            cursor={ false }
                            offset={ 5 }
                        />
                        <ReferenceArea 
                            x1={ 4 } 
                            x2={ 6 } 
                            y1={ -100 } 
                            y2={ 100 } 
                            fill="black" 
                            fillOpacity={ 0.1 } 
                            ifOverflow="visible"
                        />
                    </LineChart>
                </ResponsiveContainer>
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