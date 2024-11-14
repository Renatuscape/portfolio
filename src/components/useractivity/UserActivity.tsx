import styles from './UserActivity.module.css';

export function UserActivity() {
    return <>
        <div className={styles.userActivity}>
            <h1>Current Projects</h1>
            <ul>
                <li>Building this portfolio in TypeScript/React</li>
                <li>Polishing my JavaScript skills with <a href='https://www.theodinproject.com/'>The Odin Project</a></li>
                <li>Working on my Unity/C# game. <a href='https://renatuscape.itch.io/a-stranger-comes-home'>Try it for free!</a></li>
            </ul>
        </div>
    </>
};