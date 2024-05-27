import styles from "@/app/ui/components/Badge/badge.module.scss";

export default function Badge({ badge }: { badge: string }) {
  return (
    <div className={styles.badge}>
      <p>{badge}</p>
    </div>
  );
}
