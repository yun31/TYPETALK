import AuthButtons from "@/src/app/components/authButton";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.leftSection}>
        <div className={styles.mainTitleContainer}>
          <div className={styles.mainTitle}>
            대체 저 사람은 어떤 생각을 할까?
          </div>
          <Image
            alt="wave"
            src="/assets/wave.svg"
            className={styles.waveImage}
          />
        </div>
        <div className={styles.mbtiSection}>
          <div className={styles.mbtiTitle}>
            궁금한 <b>MBTI</b>와
            <br />
            대화를 나눠보세요!
          </div>
          <Image
            alt="wave"
            src="/assets/star.svg"
            className={styles.starImage}
          />
        </div>
      </div>
      <div className={styles.rightSection}>
        <AuthButtons />
      </div>
    </main>
  );
}
