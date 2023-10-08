import styles from './index.module.css';

export default function Loading() {
  return (
    <div className={styles.base}>
      <div className={styles.icon}></div>
      <div className={styles.text}>LOADLING</div>
    </div>
  );
}
