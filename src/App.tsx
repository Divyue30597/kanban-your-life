import styles from "./app.module.scss";
import Container from "@/components/Container/container";
import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Sidebar/sidebar";

function App() {
  return (
    <>
      <Navbar />
      <Container className={styles.container}>
        <Sidebar />
        <div>body</div>
      </Container>
      <div>footer</div>
    </>
  );
}

export default App;
