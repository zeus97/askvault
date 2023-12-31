import styles from './page.module.scss';
import QuestionContainer from '@/components/QuestionContainer';



export default function Home() {
  return (
    <section className={styles.home}>

      <div className={styles.container}>

        <div className={styles.filterA}></div>
        <div className={styles.filterB}></div>
        <div className={styles.filterC}></div>
        <div className={styles.filterD}></div>

        <h1 className={styles.title}>
          Welcome to <span>AskVault:</span>
          Unlock a World of Knowledge and Discover the Power of Asking.
        </h1>
        <a href='#explore'>
          <button className={styles.button}
          type='button'>
            Explore
          </button>
          </a>
      </div>

      <div id='explore' style={{border:"1px solid transparent"}}>
        <QuestionContainer />
      </div>
    </section>
  )
}
