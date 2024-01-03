import style from "./activity.module.css"
import { formatActivity } from "../../../services/dataFormatter.service"
import { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'


/**
 * Return the Activity's bar chart
 * @param { Number } userId
 * @returns { HTMLElement }
 */
function ActivityGraph({ userId }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [activity, updateData] = useState()

    useEffect(() => {
        const getInformations = async() => {
            try { 
                updateData( await formatActivity(userId) )
            } catch ( error ) {
                updateIsError(true)
            }
            updateIsLoadingGet(false)
        }        
        getInformations()
    }, [ userId ])

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div>
                    <div className={ style.tooltip }>
                        <span>{ `${ payload[0].value }${ payload[0].unit }` }</span>
                        <span>{ `${ payload[1].value }${ payload[1].unit }` }</span>
                    </div>     
                    <div className={ style.cursor }></div>               
                </div>
            )            
        }
        return null
    }

    const renderCustomLegend = ({ payload }) => {
        return (
            <ul className={ style.legendContainer } >
                <li style={{ color: `${payload[0].color}` }}>
                    <span className={ style.legendDetails } >
                        Poids (kg)
                    </span>
                </li>
                <li style={{ color: `${payload[1].color}` }}>
                    <span className={ style.legendDetails }>
                        Calories brûlées (kCal)
                    </span>
                </li>
          </ul>
        )
    }

    const renderCustomXAxisTick = ({ x, y, payload }) => {
        return (
            <text x={ x-4 } y={ y+24 } dy={ 0 }>
                { payload.index + 1 }
            </text>
        )       
    }

    const renderCustomYAxisTick = ({ x, y, payload }) => {
        return (
            <text x={ x+16 } y={ y+2 } dy={ 0 }>
                { payload.value }
            </text>
        )       
    }

    return (
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Activité quotidienne</h2>
            { !isLoadingGet && !isError &&
                <ResponsiveContainer height="70%" width="100%" >
                    <BarChart
                        data={ activity }
                        className={ style.graph }
                        barSize={ 8 }
                        barGap={ 8 }
                        overflow= 'visible'
                    >
                        <CartesianGrid 
                            strokeDasharray="2 2" 
                            horizontal={ true }
                            vertical={ false }
                        />
                        <XAxis 
                            dataKey="day"
                            tickLine={ false } 
                            axisLine={{ stroke: 'rgba(155, 158, 172, 1)' }}
                            tick={ renderCustomXAxisTick }
                            interval={ 0 }
                            padding={{ left: 12, right: 12 }}
                            scale="point"
                            className={ style.XAxis }
                        />
                        <YAxis 
                            dataKey="kilogram"
                            axisLine={ false } 
                            tickLine={ false } 
                            yAxisId="right"
                            orientation="right"
                            interval={ 1 }
                            domain={['dataMin-1', "auto"]}
                            tick={ renderCustomYAxisTick }
                            tickMargin={ 20 }
                            className={ style.YAxis }
                        />
                        <YAxis 
                            dataKey="calories"
                            yAxisId="left"
                            domain={[0, 'dataMax']}
                            hide
                        />
                        <Legend 
                            verticalAlign="top"
                            content={ renderCustomLegend }
                        />
                        <Tooltip 
                            content={ renderCustomTooltip }
                            position={{ y: 0 }}
                            allowEscapeViewBox={{ x: true, y: true }}
                        />                        
                        <Bar 
                            dataKey="kilogram" 
                            unit="kg"
                            yAxisId="right"
                            fill="rgba(40, 45, 48, 1)"
                            radius={[ 10, 10, 0, 0 ]}
                        />
                        <Bar 
                            dataKey="calories" 
                            unit="Kcal"
                            yAxisId="left"
                            fill="rgba(255, 0, 0, 1)"
                            radius={[ 10, 10, 0, 0 ]}
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