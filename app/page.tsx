import Nav from '@/components/Nav';
import styles from './page.module.scss';



export default function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.filterA}></div>
      <div className={styles.filterB}></div>
      <div className={styles.filterC}></div>

      <Nav />
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <span>AskVault:</span>
          Unlock a World of Knowledge and Discover the Power of Asking.
        </h1>
        <button className={styles.button} type='button'>Explore</button>
      </div>
    </section>
  )
}
