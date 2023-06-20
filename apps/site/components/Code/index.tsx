import { css } from "@emotion/react";

type CodeProps = {
  children?: React.ReactNode;
};

export default function Code({ children }: CodeProps): JSX.Element {
  return (
    <pre
      css={css`
        padding: 0.7rem 1rem;
        border-radius: 7px;
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.04);
        font-size: 0.9rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      `}
    >
      {children}
    </pre>
  );
}
