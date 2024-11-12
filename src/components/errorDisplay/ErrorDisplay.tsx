import styles from './ErrorDisplay.module.css'

type ErrorProps = {
    message: string;
}

export function ErrorDisplay({ message }: ErrorProps) {

    return <>
        <div className={styles.error}>
            {message}
        </div>
    </>
}