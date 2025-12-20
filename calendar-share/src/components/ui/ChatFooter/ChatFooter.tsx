import styles from './ChatFooter.module.css';

export default function ChatFooter() {
  return (
    <div className={styles.chatFooterWrapper}>
      <input
        type="text"
        className={styles.chatInput}
        placeholder="input any message"
      />
      <button className={styles.submitButton}>送信</button>
    </div>
  );
}
