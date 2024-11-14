// The default page displayed at the root address

import { Card } from '../components/card/Card'
import { Page } from '../components/page/Page'
import { RepoCollection } from '../components/repocollection/RepoCollection';
import { UserActivity } from '../components/useractivity/UserActivity';
import { UserInfo } from '../components/userinfo/UserInfo';
import styles from './Pages.module.css';


export function Home() {

    // Custom card in-line styling keeps this one corner of the UserInfo Card from extending past the  icon
    return (
        <Page>
            <div className={styles.homeGrid}>
                <div className={styles.infoColumn}>
                    <Card customStyle={{ borderTopLeftRadius: '85px' }}>
                        <UserInfo />
                    </Card>
                    <Card>
                        <UserActivity />
                    </Card>
                </div>
                <Card>
                    <RepoCollection />
                </Card>
            </div>
        </Page >
    )
}