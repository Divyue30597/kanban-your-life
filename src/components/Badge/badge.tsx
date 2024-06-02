import styles from "./badge.module.scss";

export default function Badge({ badge }: { badge: string }) {
  return (
    <div className={styles.badge}>
      <p>{badge}</p>
    </div>
  );
}
