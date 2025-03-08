import Link from "next/link";
import styles from "./authButton.module.css";

export default function AuthButtons() {
  return (
    <div className={styles.authContainer}>
      <div className={styles.buttonCard}>
        <p>로그인 없이 바로 대화할 수 있어요!</p>
        <Link href="/option" className={styles.startButton}>
          바로 시작하기
        </Link>
      </div>

      <div className={styles.buttonCard}>
        <p>대화 기록을 저장할 수 있어요!</p>
        <button className={styles.googleButton}>
          <img src="/assets/google.png" />
          Google로 로그인하기
        </button>
      </div>
    </div>
  );
}
