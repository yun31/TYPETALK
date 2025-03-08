import styles from "./GenderSelector.module.css";

const GENDER_OPTIONS = ["남성", "여성"];

export default function GenderSelector({
  selectedGender,
  setSelectedGender,
}: {
  selectedGender: string | null;
  setSelectedGender: (gender: string) => void;
}) {
  const handleSelect = (gender: string) => {
    setSelectedGender(gender);
    console.log("gender:", gender);
  };

  return (
    <div className={styles.genderContainer}>
      {GENDER_OPTIONS.map((gender) => (
        <button
          key={gender}
          className={`${styles.genderButton} ${
            selectedGender === gender ? styles.selected : ""
          }`}
          onClick={() => handleSelect(gender)}
        >
          {gender}
        </button>
      ))}
    </div>
  );
}
