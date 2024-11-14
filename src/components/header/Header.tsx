import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
    return (
        <>
            <div className={styles.header}>
                <a href="https://github.com/Renatuscape" target="_blank">
                    <h1>Renatuscape</h1>
                </a>
                <nav>
                    <div className={styles.navitem}>
                        <Link to={"/portfolio/"}>About</Link>
                    </div>
                    <div className={styles.navitem}>
                        <Link to={"/portfolio/guestbook"}>Guest Book</Link>
                    </div>
                </nav>
            </div>
        </>
    )
}