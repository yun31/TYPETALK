import styles from "./AgeSelector.module.css";

const AGE_GROUPS = ["10대 미만", "10대", "20대", "30대", "40대", "50대 이상"];

export default function AgeSelector({
  selectedAge,
  setSelectedAge,
}: {
  selectedAge: string | null;
  setSelectedAge: (age: string) => void;
}) {
  const handleSelect = (age: string) => {
    setSelectedAge(age);
    console.log("age:", age);
  };

  return (
    <div className={styles.ageContainer}>
      {AGE_GROUPS.map((age) => (
        <button
          key={age}
          className={`${styles.ageButton} ${
            selectedAge === age ? styles.selected : ""
          }`}
          onClick={() => handleSelect(age)}
        >
          {age}
        </button>
      ))}
    </div>
  );
}
