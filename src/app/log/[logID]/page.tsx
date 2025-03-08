"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function ChatLogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const date = searchParams.get("date") || "날짜 없음";
  const selectedMBTI = searchParams.get("mbti") || "";
  const selectedGender = searchParams.get("gender") || "";
  const selectedAge = searchParams.get("age") || "";
  const relationship = searchParams.get("relationship") || "";

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      { text: "안녕! 반가워.", sender: "user" },
      { text: "안녕하세요! 저는 ChatGPT입니다.", sender: "bot" },
      { text: "넌 MBTI가 뭐야?", sender: "user" },
      { text: "저는 AI라서 MBTI가 없어요!", sender: "bot" },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.date}>{date}</div>
        <div className={styles.chatTags}>
          <span className={styles.mbtiTag}>{selectedMBTI}</span>
          <span className={styles.tag}>{selectedGender}</span>
          <span className={styles.tag}>{selectedAge}</span>
          <span className={styles.tag}>{relationship}</span>
        </div>
        <button className={styles.backButton} onClick={() => router.back()}>
          뒤로가기
        </button>
      </div>

      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
