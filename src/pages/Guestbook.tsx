import { Card } from '../components/card/Card'
import { Page } from '../components/page/Page'

export function Guestbook() {
    return (
        <Page title='Guest Book'>
            <Card>
                <p>
                    Welcome to the guest book!
                </p>
                <p>In the future, this page will display comments from guests.</p>
            </Card>
        </Page>
    )
}