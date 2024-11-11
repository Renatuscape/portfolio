import { Octokit } from "octokit";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

type UserData = {
    login: string;
    name: string;
    avatar_url: string;
}

export function UserInfo() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            try {
                setLoading(true);
                const octokit = new Octokit({
                    auth: auth.key
                });

                const fetchedUserData = await octokit.request('GET /users/renatuscape', {
                    username: 'renatuscape',
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28'
                    }
                });

                console.log(fetchedUserData.data);
                setUser(fetchedUserData.data);

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
            {loading ? <>Loading...</> : user != null ? <>Done loading!</> : "Unable to find user information"}
        </p>
    </>
}