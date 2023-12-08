import style from "./dashboard.module.css"
import NutrientCard from "../../components/nutrientCard"


function Dashboard() {
    return (
        <div className={ style.dashboard }>
            <div className={ style.dashboard__content }>
                <section>
                    <h1>Bonjour <span className={ style.userName }>Name</span></h1>
                    <span className={ style.personalizedMessage }>Personnal message</span>                   
                </section>
                <section className={ style.dataContainer }>
                    <div className={ style.nutrientCards }>
                        <NutrientCard />  
                        <NutrientCard />  
                        <NutrientCard />  
                        <NutrientCard />                        
                    </div>
                    <div className={ style.graph1 }></div>
                    <div className={ style.graph2 }></div>
                    <div className={ style.graph3 }></div>
                    <div className={ style.graph4 }></div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard