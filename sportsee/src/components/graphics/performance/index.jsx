import style from "./performance.module.css"
import { formatPerformance } from "../../../services/dataFormatter.service"
import { useState, useEffect } from "react"
import { ResponsiveContainer, RadarChart, PolarGrid, Radar, PolarAngleAxis, PolarRadiusAxis } from 'recharts'


function PerformanceGraph({ userId }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)
    const [performance, updateData] = useState()

    useEffect(() => {
        const getInformations = async() => {
            let performanceData
            try {
                performanceData = await formatPerformance(userId) 
                updateData(performanceData)
            } catch ( error ) {
                updateIsError(true)
            }
            updateIsLoadingGet(false)
        }
        getInformations()
    }, [ userId ])

    const renderCustomAxisTick = ({ x, y, cx, cy, payload }) => {
        return (
            <text 
                x={ x + (x - cx) / 7 } 
                y={ (y + 5) + (y - cy) / 20 } 
                textAnchor="middle"
                className={ style.axis }
            >
                { payload.value }
            </text>
        )
    }

    return (
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Performances</h2>            
            { !isLoadingGet && !isError &&
                <ResponsiveContainer height="100%" width="100%">
                    <RadarChart
                        data={ performance }
                        outerRadius="80%"
                        innerRadius="10%"
                        overflow= 'visible'
                    >
                        <PolarGrid 
                            radialLines={false} 
                            stroke="white"
                            polarRadius={[0, 10, 22, 47, 70, 95]} 
                        />
                        <PolarAngleAxis 
                            dataKey="kind" 
                            stroke="white" 
                            axisLine={ false }
                            tickLine={ false } 
                            tick={ renderCustomAxisTick }
                        />
                        <PolarRadiusAxis 
                            domain={[0, "dataMax+20"]}
                            axisLine={ false }
                            tick={ false }
                        />
                        <Radar 
                            name="Performance" 
                            dataKey="value" 
                            fill="rgba(255, 1, 1, 0.7)" 
                        />
                    </RadarChart>
                </ResponsiveContainer>
            }
            { isLoadingGet && !isError
                && <p className={ style.errorMessage }>En chargement...</p> }
            { !isLoadingGet && isError 
                && <p className={ style.errorMessage }>Erreur de chargement des données...</p> }
        </div>
    )
}

export default PerformanceGraph