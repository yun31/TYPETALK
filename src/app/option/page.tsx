"use client";

import styles from "./page.module.css";
import MBTISelector from "@/src/app/components/MBTISelector";
import GenderSelector from "@/src/app/components/GenderSelector";
import AgeSelector from "@/src/app/components/AgeSelector";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function OptionPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedMBTI, setSelectedMBTI] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [relationship, setRelationship] = useState("");

  const isDisabled = useMemo(() => {
    return (
      name.trim() === "" ||
      !selectedMBTI ||
      !selectedGender ||
      !selectedAge ||
      relationship.trim() === ""
    );
  }, [name, selectedMBTI, selectedGender, selectedAge, relationship]);

  const handleRelationshipInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRelationship(value);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleStartChat = () => {
    const query = new URLSearchParams({
      name: name,
      mbti: selectedMBTI!,
      gender: selectedGender!,
      age: selectedAge!,
      relationship: relationship,
    }).toString();
    router.push(`/chat?${query}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>나의 이름을 입력해주세요</div>
      <input
        type="text"
        className={styles.input}
        placeholder="이름를 입력해주세요"
        value={name}
        onChange={handleNameInputChange}
      />

      <div className={styles.title}>대화하고 싶은 MBTI를 골라주세요</div>
      <MBTISelector
        selectedMBTI={selectedMBTI}
        setSelectedMBTI={setSelectedMBTI}
      />

      <div className={styles.title}>다른 특성도 입력해주세요</div>

      <div className={styles.label}>성별</div>
      <GenderSelector
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
      />

      <div className={styles.label}>나이</div>
      <AgeSelector selectedAge={selectedAge} setSelectedAge={setSelectedAge} />

      <div className={styles.label}>상대방과 나의 관계</div>
      <input
        type="text"
        className={styles.input}
        placeholder="관계를 입력해주세요"
        value={relationship}
        onChange={handleRelationshipInputChange}
      />

      <button
        className={`${styles.startButton} ${isDisabled ? styles.disabled : ""}`}
        onClick={handleStartChat}
        disabled={isDisabled}
      >
        대화 시작하기
      </button>
    </div>
  );
}
