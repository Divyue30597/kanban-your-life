import styles from "./navbar.module.scss";

export default function Navbar() {
  const date = new Date();

  const presentDate = date.getDate();
  const presentMonth = date.getMonth() + 1;
  const presentYear = date.getFullYear();

  return (
    <div className={styles.nav}>
      <h1>Kanban Your Life</h1>
      <p>
        Achieved your target on {presentDate}/{presentMonth}/{presentYear}?
      </p>
    </div>
  );
}
