import styles from "./MBTISelector.module.css";

const MBTI_TYPES = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

export default function MBTISelector({
  selectedMBTI,
  setSelectedMBTI,
}: {
  selectedMBTI: string | null;
  setSelectedMBTI: (mbti: string) => void;
}) {
  const handleSelect = (mbti: string) => {
    setSelectedMBTI(mbti);
    console.log("mbti:", mbti);
  };

  return (
    <div className={styles.mbtiContainer}>
      {MBTI_TYPES.map((type) => (
        <button
          key={type}
          className={`${styles.mbtiButton} ${
            selectedMBTI === type ? styles.selected : ""
          }`}
          onClick={() => handleSelect(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
