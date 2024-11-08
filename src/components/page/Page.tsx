import { ReactNode } from "react";
import styles from "./Page.module.css";

type PageProps = {
    title: string;
    children: ReactNode;
}

export function Page({ title, children }: PageProps) {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                {/* <h1>{title}</h1> */}
                {children}
            </div>
        </div>
    )
}