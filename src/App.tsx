import styles from "./app.module.scss";
import Container from "@/components/Container/container";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";
import Body from "./components/Body/body";

function App() {
  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <Sidebar />
        <Body />
      </Container>
      <div>footer</div>
    </>
  );
}

export default App;
