import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Container, Row, Col } from "onelayout";
import Box from "../components/Box";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row
          as="main"
          direction="column"
          align="center"
          className={styles.main}
        >
          <h1 className={styles.title}>
            Welcome to <a href="https://onelayout.nkdev.info/">OneLayout!</a>
          </h1>

          <p>
            The easy solution for Rows, Columns and Containers in React using
            Emotion.js
          </p>

          <Col align="stretch">
            <h2>Containers</h2>
            <Container sm>
              <Box>asdss1</Box>
            </Container>
            <Container>
              <Row justify="center">
                <Box>asd</Box>
                <Box>asd</Box>
                <Box>dddd</Box>
                <Box>45435</Box>
              </Row>
            </Container>

            <h2>Columns</h2>
            <Row>
              <Col size={1 / 3}>
                <Box>1 / 3</Box>
              </Col>
              <Col size="6rem">
                <Box>6rem</Box>
              </Col>
              <Col size="auto">
                <Box>Auto</Box>
              </Col>
              <Col>
                <Box>Grow</Box>
              </Col>
            </Row>

            <h2>Custom Gap</h2>
            <Row gap="2.7rem">
              <Col size={1 / 3}>
                <Box>1 / 3</Box>
              </Col>
              <Col size={1 / 3}>
                <Box>1 / 3</Box>
              </Col>
              <Col size={1 / 3}>
                <Box>1 / 3</Box>
              </Col>
            </Row>
            <Row gap="10px 10%">
              <Col size={1 / 2}>
                <Box>1 / 2</Box>
              </Col>
              <Col size={1 / 2}>
                <Box>1 / 2</Box>
              </Col>
              <Col size={1 / 2}>
                <Box>1 / 2</Box>
              </Col>
              <Col size={1 / 2}>
                <Box>1 / 2</Box>
              </Col>
            </Row>

            <h2>Responsive</h2>
            <Row gap="1rem" lg={{ gap: "3rem" }} sm={{ gap: "10px" }}>
              <Col size={1} md={{ size: 1 / 2 }} lg={{ size: 1 / 3 }}>
                <Box>1, md: 1 / 2, lg: 1 / 3</Box>
              </Col>
              <Col size={1} sm={{ size: "2rem" }} lg={{ size: "6rem" }}>
                <Box>1, sm: 2rem, lg: 6rem</Box>
              </Col>
              <Col size={1} sm={{ size: "auto" }}>
                <Box>1, sm: Auto</Box>
              </Col>
              <Col>
                <Box>Grow</Box>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <footer className={styles.footer}>
        <a href="https://nkdev.info/" target="_blank" rel="noopener noreferrer">
          Powered by nK
        </a>
      </footer>
    </div>
  );
}
