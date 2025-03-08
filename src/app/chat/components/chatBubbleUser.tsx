import styles from "./chatBubble.module.css";

export function ChatBubbleUser({ content }: { content: string }) {
  return (
    <div className={styles.userMessage}>
      <pre>{content}</pre>
    </div>
  );
}
