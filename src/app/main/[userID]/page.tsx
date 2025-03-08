"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import styles from "./page.module.css";

interface ChatHistory {
  date: string;
  mbti: string;
  gender: string;
  age: string;
  relationship: string;
}

export default function MainPage({
  params,
}: {
  params: Promise<{ userID: string }>;
}) {
  const router = useRouter();
  const { userID } = use(params);

  // 나중에 여기로 로그 데이터 가져오기
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    //예시 데이터
    setChatHistory([
      {
        date: "2025/01/01",
        mbti: "ISTJ",
        gender: "남성",
        age: "10대",
        relationship: "친구",
      },
      {
        date: "2025/01/01",
        mbti: "ISTJ",
        gender: "남성",
        age: "10대",
        relationship: "친구",
      },
      {
        date: "2025/01/01",
        mbti: "ISTJ",
        gender: "남성",
        age: "10대",
        relationship: "친구",
      },
      {
        date: "2025/01/01",
        mbti: "ISTJ",
        gender: "남성",
        age: "10대",
        relationship: "친구",
      },
      {
        date: "2025/01/01",
        mbti: "ISTJ",
        gender: "남성",
        age: "10대",
        relationship: "친구",
      },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <h2 className={styles.greeting}>{userID}님, 안녕하세요!</h2>
        <button
          className={styles.startChatButton}
          onClick={() => router.push("/option")}
        >
          대화 시작하기
        </button>
      </div>

      <div className={styles.chatHistoryContainer}>
        <h3 className={styles.chatHistoryTitle}>나의 대화 기록</h3>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={styles.chatHistoryItem}
            onClick={() =>
              //나중에 DB 경로로 설정
              router.push(`/log/${index}`)
            }
          >
            <span className={styles.chatDate}>{chat.date}</span>
            <div className={styles.chatTags}>
              <span className={styles.mbtiTag}>{chat.mbti}</span>
              <span className={styles.tag}>{chat.gender}</span>
              <span className={styles.tag}>{chat.age}</span>
              <span className={styles.tag}>{chat.relationship}</span>
            </div>
            <span className={styles.arrow}>➤</span>
          </div>
        ))}
      </div>
    </div>
  );
}
