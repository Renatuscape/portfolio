import { Octokit } from "octokit";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./RepoCollection.module.css";

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

    useEffect(() => {
        async function fetchUserData() {
            try {
                setLoading(true);
                const octokit = new Octokit({
                    auth: auth.key
                });

                const fetchedRepos = await octokit.request('GET /users/renatuscape/repos', {
                    username: 'renatuscape',
                    headers: {
                        'x-GitHub-Api-Version': '2022-11-28'
                    },

                    per_page: 100,
                    sort: 'updated',
                    direction: 'desc'
                });

                console.log(fetchedRepos.data);
                setRepos(fetchedRepos.data);

            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [])

    const repoList = repos.map((repo) =>
        <div key={repo.id} className={styles.repoItem}>
            <h1>{NameFormatter(repo.name)}</h1>
            <p>{repo.description ?  repo.description : "No description"}</p>
            <div className={styles.repoFooter}><span id={styles.langTag}>{repo.language}</span><a href={repo.html_url}>Visit</a></div>
        </div>
    );

    // Turns all dashes into spaces and converts camelcase to spaces
    function NameFormatter(name: string){
    let formattedName = name.replace(/-/g, ' ');
    formattedName = formattedName.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedName = formattedName.replace(/\b\w/g, char => char.toUpperCase());

    return formattedName;
    }

    return <>
        {loading ? <>Loading...</> : repos.length > 0 ?
            <div className={styles.repoCollection}>
                {repoList}
            </div> : "Could not load repositories"}
    </>
}