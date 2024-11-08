import { Card } from '../components/card/Card'
import { Page } from '../components/page/Page'
import styles from './Pages.module.css';

export function Home() {
    return (
        <Page>
            <div className={styles.homeGrid}>
                <Card>
                    <p>
                        lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum 
                    </p>
                </Card>
                <Card>
                    <p>
                        Created in Vite + React and TypeScript.
                    </p>
                </Card>
            </div>
        </Page>
    )
}