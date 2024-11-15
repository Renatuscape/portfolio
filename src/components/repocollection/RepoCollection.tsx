import styles from "./RepoCollection.module.css";
import { Octokit } from "octokit";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingIcon } from "../loadingIcon/LoadingIcon";
import { ErrorDisplay } from "../errorDisplay/ErrorDisplay";
import { RepoData } from "../../types/Types";
import { RepoItem } from "./RepoItem";
import { IsWhiteListed } from "./RepoWhitelist";

export function RepoCollection() {
    const auth = useContext(AuthContext);
    const [repos, setRepos] = useState<RepoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState<number>(-1);

    // This method should be triggered when clicking on a repository
    function expandRepo(id: number) {

        if (id === expanded) {
            setExpanded(-1);
        }
        else {
            setExpanded(id);
        }
        console.log('ID FOR EXPANDED REPO HAS BEEN SET TO ' + id);
    }

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

    const repoList = repos.map((repo) => {
        // Skip repositories that have not been added to the whitelist
        if (IsWhiteListed(repo)) {
            return <RepoItem repo={repo} expandedId={expanded} expand={() => expandRepo(repo.id)} key={repo.id} />
        }
    });

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