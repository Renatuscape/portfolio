import { Card } from '../components/card/Card'
import { Page } from '../components/page/Page'
import styles from './Pages.module.css';

export function Guestbook() {
    return (
        <Page>
            <Card>
                <div className={styles.guestBook}>
                    <h1>Guest Book</h1>
                    <p>
                        Welcome!
                    </p>
                    <br/>
                    <p>In the future, this page will display comments from guests.</p>
                    <br/>
                </div>
            </Card>
        </Page>
    )
}