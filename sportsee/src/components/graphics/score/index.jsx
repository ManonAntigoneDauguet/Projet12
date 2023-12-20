import style from "./score.module.css"
import { useState, useEffect } from "react"
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts'


function ScoreGraph({ score }) {
    const [isLoadingGet, updateIsLoadingGet] = useState(true)
    const [isError, updateIsError] = useState(false)

    useEffect(() => {
        if (score === undefined || score === "") {
            updateIsError(true)
        }
        updateIsLoadingGet(false)
        console.log(score[0].value)
    }, [ score ])

    const renderCustomLegend = () => {
        return (
            <div className={ style.legendContainer }>
                <div className={ style.legend }>
                    <p className={ style.percent }>{`${ score[0].value }%`}</p>
                    <p>de votre objectif</p>                    
                </div>
            </div>
        )
    }

    return (
        <div className={ style.graphContainer }>
            <h2 className={ style.title }>Score</h2>
            { !isLoadingGet && !isError &&
                <ResponsiveContainer height="100%" width="100%">
                    <RadialBarChart 
                        data={ score }
                        innerRadius="70%"
                        outerRadius="100%"
                        barSize={ 10 }
                        startAngle={ 80 }
                        endAngle={ 202 + (score[0].value * 2.4) }
                    >
                        <RadialBar 
                            dataKey="value"
                            fill="rgba(255, 1, 1, 1)"
                            strokeLinecap="round"
                            cornerRadius={25}
                        />
                        <Legend
                            content={ renderCustomLegend } 
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            }  
            { isLoadingGet && !isError
                && <p className={ style.errorMessage }>En chargement...</p> }
            { !isLoadingGet && isError 
                && <p className={ style.errorMessage }>Erreur de chargement des données...</p> }         
        </div>
    )
}

export default ScoreGraph