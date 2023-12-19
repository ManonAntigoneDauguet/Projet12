import style from "./performance.module.css"
import { getPerformance } from "../../../services/callsAPI"
import { useState, useEffect } from "react"
import { Tooltip, ResponsiveContainer, ReferenceArea, RadarChart, PolarGrid, Radar, Legend, PolarAngleAxis, PolarRadiusAxis, RadialBarChart } from 'recharts'


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

    const renderCustomAxisTick = ({ x, y, cx, cy, payload }) => {
        let kind = ""
        switch (payload.index) {
            case 0 : 
                kind = "Cardio"
                break
            case 1 : 
                kind = "Energie"
                break
            case 2 : 
                kind = "Endurance"
                break
            case 3 : 
                kind = "Force"
                break
            case 4 : 
                kind = "Vitesse"
                break
            case 5 : 
                kind = "Intensité"
                break
            default :
                kind = ""
        }
        return (
        <text 
            x={ (x - 20) + (x - cx) / 10 } 
            y={ (y + 5) + (y - cy) / 20 } 
            className={ style.axis }
        >
            { kind }
        </text>
        )
    }

    return (
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Performances</h2>            
            { !isLoadingGet && !isError &&
                <ResponsiveContainer height="100%" width="100%">
                    <RadarChart
                        data={ performance.data }
                        outerRadius="80%"
                        innerRadius="10%"
                        className={ style.graph }
                        {...{
                            overflow: 'visible'
                        }}
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
                && <p className={ style.errorMessage }>Utilisateur introuvable...</p> }
        </div>
    )
}

export default PerformanceGraph