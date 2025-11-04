import LoginPage from './login'
import styles from './styles/index.module.css'

export default function IndexPage() {
  return(
    <div className={styles.main}>
      <LoginPage />
    </div>
  )
}