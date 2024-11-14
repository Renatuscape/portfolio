import { CSSProperties, ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
    customStyle?: CSSProperties;
    children: ReactNode;
}

export function Card({children, customStyle}: CardProps) {
    return (
        <div className={styles.card} style={customStyle}>
            {children}
        </div>
    )
}