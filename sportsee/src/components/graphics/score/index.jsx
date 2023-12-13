import style from "./score.module.css"


function ScoreGraph({ score }) {


    return (
        <div className={ style.graph__content }>
            <h2>Score Graph</h2>
            <p>{ score }</p>            
        </div>
    )
}

export default ScoreGraph