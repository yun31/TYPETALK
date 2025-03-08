"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { ChatBubbleUser } from "./components/chatBubbleUser";
import { Message } from "@/lib/types";
import { createInitMsg, CreateMessage } from "@/lib/functions";
import { ChatBubbleAssistant } from "./components/chatBubbleAssistant";
import Image from "next/image";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 선택된 옵션
  const name = searchParams.get("name") || "";
  const selectedMBTI = searchParams.get("mbti") || "";
  const selectedGender = searchParams.get("gender") || "";
  const selectedAge = searchParams.get("age") || "";
  const relationship = searchParams.get("relationship") || "";

  // 채팅 상태
  const [messages, setMessages] = useState<Message[]>([
    createInitMsg(
      name,
      selectedMBTI,
      selectedGender,
      selectedAge,
      relationship
    ),
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [receiving, setReceiving] = useState(false);

  // 디버깅을 위한 메시지 변경 추적
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
    console.log("메시지 상태 업데이트:", messages);
  }, [messages]);

  //채팅 보내기
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || receiving) return;

    const userInput = inputMessage;
    setInputMessage(""); // 입력 필드 초기화
    setReceiving(true);

    // 새 사용자 메시지 객체 생성
    const userMessage: Message = { role: "user", content: userInput };

    // 함수형 업데이트를 사용하여 이전 상태에 기반한 업데이트 수행
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // 현재 대화 기록과 새 메시지를 합친 전체 대화 기록
      const currentMessages = [...messagesRef.current, userMessage];

      const res_createMessage = await CreateMessage(currentMessages);

      if (res_createMessage.result === "error") {
        console.error("메시지 생성 오류:", res_createMessage.error);
        throw res_createMessage.error;
      }

      console.log("어시스턴트 응답:", res_createMessage.message);

      // API 응답 구조 확인 및 처리
      let assistantMessage: Message;

      // API 응답 구조 확인
      if (res_createMessage.message && res_createMessage.message.choices) {
        // Gemini API 형식인 경우
        const responseText =
          res_createMessage.message.choices[0]?.message?.content ||
          res_createMessage.message.choices[0]?.text ||
          "응답을 받지 못했습니다.";

        assistantMessage = {
          role: "assistant",
          content: responseText,
        };
      } else if (
        typeof res_createMessage.message === "object" &&
        res_createMessage.message.role === "assistant"
      ) {
        // 이미 올바른 형식인 경우
        assistantMessage = res_createMessage.message;
      } else {
        // 기타 경우
        console.warn("예상하지 못한 응답 형식:", res_createMessage.message);
        assistantMessage = {
          role: "assistant",
          content: "응답 형식이 올바르지 않습니다.",
        };
      }

      // 새로운 어시스턴트 메시지를 추가할 때도 함수형 업데이트 사용
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("메시지 처리 중 오류 발생:", error);
      alert("메시지 전송 중 오류가 발생했습니다.");
    } finally {
      setReceiving(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 선택한 옵션 표시 */}
      <div className={styles.header}>
        <div className={styles.mbtiTag}>{selectedMBTI}</div>
        <div className={styles.tag}>{selectedGender}</div>
        <div className={styles.tag}>{selectedAge}</div>
        <div className={styles.tag}>{relationship}</div>
        <button
          className={styles.endChatButton}
          onClick={() => router.push("/")}
        >
          대화 종료하기
        </button>
      </div>

      <div className={styles.chatWindow}>
        {messages
          .filter((message) => message.role !== "system") // system 메시지 제외
          .map((message, index) =>
            message.role === "user" ? (
              <ChatBubbleUser key={`msg-${index}`} content={message.content} />
            ) : (
              <ChatBubbleAssistant
                key={`msg-${index}`}
                content={message.content}
              />
            )
          )}
      </div>

      <form className={styles.inputContainer} onSubmit={sendMessage}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="메시지를 입력하세요"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={receiving}
        />
        <button
          className={styles.sendButton}
          disabled={receiving || inputMessage.trim() === ""}
          type="submit"
        >
          <Image
            src="/assets/arrow.svg"
            alt="Send"
            className={styles.sendIcon}
          />
        </button>
      </form>
    </div>
  );
}
