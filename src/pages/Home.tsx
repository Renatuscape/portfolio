import { Card } from '../components/card/Card'
import { Page } from '../components/page/Page'
import { RepoCollection } from '../components/repocollection/RepoCollection';
import { UserInfo } from '../components/userinfo/UserInfo';
import styles from './Pages.module.css';


export function Home() {

    return (
        <Page>
            <div className={styles.homeGrid}>
                <Card>
                    <UserInfo />
                    <p>
                        Created in Vite + React and TypeScript.
                    </p>
                </Card>
                <Card>
                    <RepoCollection />
                </Card>
            </div>
        </Page >
    )
}