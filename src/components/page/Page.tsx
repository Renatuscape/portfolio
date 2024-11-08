import { ReactNode } from "react";
import styles from "./Page.module.css";

type PageProps = {
    children: ReactNode;
}

export function Page({children }: PageProps) {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                {/* <h1>{title}</h1> */}
                {children}
            </div>
        </div>
    )
}