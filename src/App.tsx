import styles from "./app.module.scss";
import Container from "@/components/Container/container";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
import Body from "./components/Body/body";
import { useAppSelector } from "./store/storeHooks";
import image from "/styles/images/start_your_journey.svg";

function App() {
  const boardSelector = useAppSelector((state) => state.boards);

  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <Sidebar />
        {Object.keys(boardSelector).length ? (
          <Body />
        ) : (
          <div className={styles.no_cols}>
            <img src={image} alt="start_your_journey" />
            <p> Start By Adding a Board</p>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
