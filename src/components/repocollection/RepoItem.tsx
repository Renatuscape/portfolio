import styles from "./RepoCollection.module.css";
import { RepoData } from "../../types/Types";

type RepoProps = {
    repo: RepoData;
}

export function RepoItem({ repo }: RepoProps) {

    // Turns all dashes into spaces and converts camelcase to spaces
    function NameFormatter(name: string) {
        return name
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Adds space between lowercase and uppercase
            .replace(/-/g, ' ')                       // Replaces hyphens with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes first letter of each word
    }


    return <>
        <div className={styles.repoItem}>
            <h1>{NameFormatter(repo.name)}</h1>
            <p>{repo.description ? repo.description : "No description"}</p>
            <div className={styles.repoFooter}>
                <span id={styles.langTag}>{repo.language}</span>
                <div className={styles.linkContainer}>
                    {repo.homepage && <a title='Go to live page' className={styles.live} href={repo.homepage} target="_blank">Live View ◥</a>}
                    <a title='Show GitHub repo' href={repo.html_url} target="_blank">Visit ◥</a>
                </div>
            </div>
        </div>
    </>
}