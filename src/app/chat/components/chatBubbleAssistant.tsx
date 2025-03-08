import styles from "./chatBubble.module.css";

export function ChatBubbleAssistant({ content }: { content: string }) {
  return (
    <div className={styles.botMessage}>
      <pre>{content}</pre>
    </div>
  );
}
