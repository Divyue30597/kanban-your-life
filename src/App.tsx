import styles from "./app.module.scss";
import Container from "@/components/Container/container";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
import Body from "./components/Body/body";
import { useAppSelector } from "./store/storeHooks";

function App() {
  const boardSelector = useAppSelector((state) => state.boards);

  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <Sidebar />
        {boardSelector.boards.length ? <Body /> : <>Add a new body</>}
      </Container>
    </>
  );
}

export default App;
