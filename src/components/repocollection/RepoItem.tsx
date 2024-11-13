import styles from "./RepoCollection.module.css";
import { RepoData } from "../../types/Types";
import { useContext, useEffect, useState } from "react";
import { Octokit } from "octokit";
import { AuthContext } from "../../contexts/AuthContext";

type RepoProps = {
    repo: RepoData;
    expandedId: number;
    expand: (id: number) => void;
}

type LangData = {
    [name: string]: number;
}

export function RepoItem({ repo, expandedId, expand }: RepoProps) {
    const [repoLangs, setRepoLangs] = useState<LangData | null>(null);
    const auth = useContext(AuthContext);

    // Turns all dashes into spaces and converts camelcase to spaces
    function NameFormatter(name: string) {
        return name
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Adds space between lowercase and uppercase
            .replace(/-/g, ' ')                       // Replaces hyphens with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes first letter of each word
    }

    async function onClickHandler() {
        expand(repo.id);
        console.log('OnClickHandler is running')
        // Only fetch if no language data has been fetched yet
        if (repoLangs === null) {
            try {
                console.log('Attempting to fetch languages')
                const octokit = new Octokit({
                    auth: auth.key
                });

                const fetchedLanguages = await Promise.race([
                    octokit.request('GET ' + repo.languages_url, {
                        username: 'renatuscape',
                        headers: {
                            'x-GitHub-Api-Version': '2022-11-28'
                        },
                        per_page: 100,
                        sort: 'updated',
                        direction: 'desc'
                    }),
                    timeoutPromise(10000)
                ]);

                setRepoLangs(fetchedLanguages.data); // Set data to prevent future fetches
                console.log(fetchedLanguages.data);
                console.log('Completed fetching languages')
            } catch (error: any) {
                console.error(error);
            }
        }
        else {
            console.log('Fetch was not run. OnClickHandler ended early. Repolangs was ' + repoLangs);
        }
    }

    useEffect(() => {
        if (repoLangs !== null) {
            console.log('Updated repoLangs:', repoLangs);
        }
    }, [repoLangs]);

    // Timeout function to reject after a given time
    const timeoutPromise = (timeout: number) => new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    return <>
        <div className={styles.repoItem}>
            <h1>{NameFormatter(repo.name)}</h1>
            <p>{repo.description ? repo.description : "No description"}</p>
            <div className={styles.repoFooter}>
                <div className={styles.languageContainer}>
                    <button onClick={onClickHandler}>{repo.id === expandedId ? <>▲</> : <>▼</>}</button>
                    {repo.id !== expandedId && <span id={styles.langTag}>{repo.language}</span>}
                </div>
                <div className={styles.linkContainer}>
                    {repo.homepage && <a title='Go to live page' className={styles.live} href={repo.homepage} target="_blank">Live View ◥</a>}
                    <a title='Show GitHub repo' href={repo.html_url} target="_blank">Visit ◥</a>
                </div>
            </div>
            {repo.id === expandedId && <div className={styles.expandedInfoContainer}>
                {repoLangs ? <>
                            {Object.entries(repoLangs).map(([language, bytes]) => (
                                <div key={language} className={styles.expandedLangItem}>
                                    <span id={styles.langTag}>{language}</span> <span className={styles.expandedItemLine}> </span><span>{bytes}B</span>
                                </div>
                            ))}
                        </> :
                        <p>Fetching language data...</p>
                    }
            </div>}
        </div>
    </>
}