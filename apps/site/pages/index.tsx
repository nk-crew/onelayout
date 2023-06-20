import Head from "next/head";
import Image from "next/image";
import { css } from "@emotion/react";
import { Container, Row, Col } from "onelayout";
import Box from "../components/Box";
import Code from "../components/Code";

export default function Home() {
  return (
    <div>
      <Head>
        <title>
          OneLayout - React library for responsive Rows, Columns and Containers
        </title>
        <meta
          name="description"
          content="One Layout is a set of layout components for React"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Col
        css={css`
          padding-top: 120px;
          padding-bottom: 120px;
        `}
      >
        <h1
          css={css`
            font-weight: 800;
            font-size: clamp(45px, 6vw, 80px);
            line-height: 1.15;
            text-align: center;
            margin: 0;
          `}
        >
          React Layout Library
        </h1>

        <p
          css={css`
            text-align: center;
          `}
        >
          The easy solution for responsive Rows, Columns, and Containers using
          Emotion.js
        </p>
      </Col>
      <Container>
        <Row as="main" direction="column" align="stretch" gap="1rem">
          <Container>
            <h2>Introduction</h2>
            <p>
              Before installation, you need to know that this library is in the
              alpha stage. This means that we will make significant and breaking
              changes.
            </p>
            <p>
              OneLayout is created to just simplify creating responsive layouts.
              We often use these responsive styles and with this library, we can
              reuse them.
            </p>
          </Container>

          <Container>
            <h2>Getting Started</h2>
            <p>Install OneLayout library</p>
            <Code>{`npm i onelayout`}</Code>
            <p>Import components</p>
            <Code>{`import { Container, Row, Col } from "onelayout";`}</Code>
            <p>Use components inside your app</p>
            <Code>{`<Container>
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
</Container>`}</Code>
          </Container>

          <Container>
            <h2>Custom Breakpoints and Theme</h2>
            <p>
              There is support for ThemeProvider and you can easily override
              defaults. Example:
            </p>
            <Code>
              {`import { ThemeProvider } from "onelayout";

export default function App() {
  return (
    <ThemeProvider
      theme={{
        breakpoints: {
          sm: "576px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          xxl: "1536px",
        },
        containerMaxWidths: {
          sm: "540px",
          md: "740px",
          lg: "996px",
          xl: "1200px",
          xxl: "1490px",
        },
      }}
    >
      ... your app ...
    </ThemeProvider>
  );
}`}
            </Code>
          </Container>

          <Container>
            <h2>Examples</h2>
          </Container>

          <Container>
            <h3>Containers</h3>
            <Container max="sm">
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
          </Container>

          <Container>
            <h3>Columns</h3>
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
          </Container>

          <Container>
            <h3>Custom Gap</h3>
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
          </Container>

          <Container>
            <h3>Responsive</h3>
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
            <Row gap="1rem" lg={{ gap: "3rem" }} sm={{ gap: "10px" }}>
              <Col size={1} md={{ size: 1 / 2 }} lg={{ size: 1 / 3 }}>
                <Box>1, md: 1 / 2, lg: 1 / 3</Box>
              </Col>
            </Row>
          </Container>
          <Container
            css={css`
              padding-top: 30px;
              padding-bottom: 30px;
              margin-top: 30px;
              text-align: center;
              border-top: 1px solid #eee;
            `}
          >
            <a href="https://github.com/nk-crew/onelayout" target="_blank">
              OneLayout on Github
            </a>
          </Container>
        </Row>
      </Container>
    </div>
  );
}
