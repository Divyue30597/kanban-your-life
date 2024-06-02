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
      {/* <div className={styles.footer}>
        <p>
          Made with 💖 by{" "}
          <a target="_blank" href="https://github.com/Divyue30597">
            Divyue
          </a>
        </p>
      </div> */}
    </>
  );
}

export default App;
