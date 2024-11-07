import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import reactLogo from '../../assets/react.svg'

export function Header() {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logocontainer}>
                    <img src={reactLogo} className="react-logo" alt="React logo" />
                    <a href="https://github.com/Renatuscape" target="_blank">
                        <h1>Renatuscape</h1>
                    </a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/portfolio/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/portfolio/guestbook"}>Guest Book</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}