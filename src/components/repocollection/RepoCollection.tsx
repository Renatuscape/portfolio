import { Octokit } from "octokit";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

type RepoData = {
    id: number;
    name: string;
    description: string | null;
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

    return <>
        <p>
            {loading ? <>Loading...</> : repos.length > 0 ? <>Done loading!</> : "Unable to find any repositories"}
        </p>
    </>
}