import { Octokit } from "octokit";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./RepoCollection.module.css";
import { LoadingIcon } from "../loadingIcon/LoadingIcon";
import { ErrorDisplay } from "../errorDisplay/ErrorDisplay";

type RepoData = {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string;
    languages_url: string;
}

export function RepoCollection() {
    const auth = useContext(AuthContext);
    const [repos, setRepos] = useState<RepoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Timeout function to reject after a given time
    const timeoutPromise = (timeout: number) => new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    useEffect(() => {
        async function fetchRepoData() {
            try {
                console.log("Starting fetchRepoData");
                setLoading(true);
                setError(null);

                const octokit = new Octokit({
                    auth: auth.key
                });

                console.log("Fetching repositories...");
                const fetchedRepos = await Promise.race([
                    octokit.request('GET /users/renatuscape/repos', {
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

                console.log("Fetched repositories:", fetchedRepos.data);
                setRepos(fetchedRepos.data);

            } catch (error: any) {
                setError("Calls to GitHub API for repository data have been exhausted.");
            } finally {
                setLoading(false);
            }
        }

        fetchRepoData();
    }, [auth.key])

    const repoList = repos.map((repo) =>
        <div key={repo.id} className={styles.repoItem}>
            <h1>{NameFormatter(repo.name)}</h1>
            <p>{repo.description ? repo.description : "No description"}</p>
            <div className={styles.repoFooter}><span id={styles.langTag}>{repo.language}</span><a href={repo.html_url}>Visit ◥</a></div>
        </div>
    );

    // Turns all dashes into spaces and converts camelcase to spaces
    function NameFormatter(name: string) {
        return name
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Adds space between lowercase and uppercase
            .replace(/-/g, ' ')                       // Replaces hyphens with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes first letter of each word
    }

    return <>
        {error ? <ErrorDisplay message={error} /> : <>
            {loading ? <><LoadingIcon /></> :
                repos.length > 0 ? <>
                    <div className={styles.repoCollectionContent}>
                        {repoList}
                    </div>
                </> : <></>
            }
        </>}
    </>
}