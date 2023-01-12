import { css } from "@emotion/react";

type BoxProps = {
  children?: React.ReactNode;
};

export default function Box({ children }: BoxProps): JSX.Element {
  return (
    <div
      css={css`
        padding: 0.7rem 1rem;
        border-radius: 7px;
        border: 1px solid #ccc;
        background-color: #fff;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.04);
      `}
    >
      {children}
    </div>
  );
}
