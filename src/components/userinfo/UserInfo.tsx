import { Octokit } from "octokit";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./UserInfo.module.css";
import { LoadingIcon } from "../loadingIcon/LoadingIcon";
import { ErrorDisplay } from "../errorDisplay/ErrorDisplay";

type UserData = {
    login: string;
    name: string;
    avatar_url: string;
}

export function UserInfo() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Timeout function to reject after a given time
    const timeoutPromise = (timeout: number) => new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    useEffect(() => {
        async function fetchUserData() {
            try {
                setLoading(true);
                const octokit = new Octokit({
                    auth: auth.key
                });

                const fetchedUserData = await Promise.race([
                    octokit.request('GET /users/renatuscape', {
                        username: 'renatuscape',
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    }),
                    timeoutPromise(10000)
                ]);

                console.log(fetchedUserData.data);
                setUser(fetchedUserData.data);

            } catch (error: any) {
                setError("Calls to GitHub API for user data have been exhausted.");
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, [auth.key])

    return <>
        {error ? <ErrorDisplay message={error} /> : <>
            {loading ? <><LoadingIcon /></> : user != null ? <>
                <div className={styles.userInfo}>
                    <div className={styles.imageContainer}>
                        <img src={user.avatar_url} />
                    </div>
                    <div className={styles.infoContainer}>
                        <h1>{user.name}</h1>
                    </div>
                </div>
            </> : "Unable to find user information"}
        </>}
    </>
}