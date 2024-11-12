import styles from "./LoadingIcon.module.css"
import loadingIcon from '../../assets/loading_icon.svg'


export function LoadingIcon() {

    return <>
        <div className={styles.loadingIcon}>
            <img src={loadingIcon} />
        </div>
    </>
}