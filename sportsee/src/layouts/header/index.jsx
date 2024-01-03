import style from "./header.module.css"
import logo from "../../assets/logo.svg"
import logoName from "../../assets/logoName.svg"


/**
 * Return a horizontal nav bar
 * @returns  { HTMLElement }
 */
function Header() {
    return(
        <header>
            <div className={ style.logoContainer }>
                <img 
                    src={ logo } 
                    alt="SportSee logo" 
                    className={ style.logo }
                />
                <img 
                    src={ logoName } 
                    alt="SportSee" 
                    className={ style.logoName}
                />
            </div>
            <nav aria-label="nav-1">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/">Profil</a></li>
                    <li><a href="/">Réglages</a></li>
                    <li><a href="/">Communauté</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header