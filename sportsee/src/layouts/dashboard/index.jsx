import style from "./dashboard.module.css"


function Dashboard() {
    return (
        <div className={ style.dashboard }>
            <div className={ style.dashboard__content }>
                <h1>Bonjour <span className={ style.userName }>Name</span></h1>
                <span className={ style.personalizedMessage }>Personnal message</span>
            </div>
        </div>
    )
}

export default Dashboard