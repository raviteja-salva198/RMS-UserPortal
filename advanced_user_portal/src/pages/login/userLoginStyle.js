import styled, { css } from "styled-components";

export const UserLoginStyle = styled.div`
  /* colors */
  --gray-400: #98a2b3;
  --gray-500: #667085;
  --gray-700: #344054;
  --gray-900: #101828;
  --error-500: #ff3932;
  --success-700: #338213;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 95%;
    padding: 20px 0;

    &.max_w_380 {
      max-width: 380px;
      margin: 0 auto;
    }

    &.max_w_760 {
      max-width: 760px;
      margin: 0 auto;
    }
  }

  .phone_number_container {
    position: relative;
    display: flex;
  }
  .heading {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    color: #4f5a6f;

    & > span.blue {
      color: #0b5fff;
    }
    & > span.red {
      color: #fc2947;
    }

    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 1.25rem;
    border: 1px solid #d0d5dd;
    border-radius: 5px;
    width: inherit;
    background-color: #fff;

    .gray {
      color: var(--gray-500);
    }

    .green {
      color: var(--success-700);
    }

    & .two_column {
      display: grid;
      gap: 0.625rem;
      grid-template-columns: 1fr;
    }

    & .grid_layout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr 1fr 1fr;
      gap: 0.625rem;

      & > div:nth-child(1) {
        grid-row: 1;
        grid-column: span 2;
      }

      & > div:nth-child(2) {
        order: 1;
        grid-row: 3;
      }

      & div:nth-child(3) {
        grid-row: 2;
        grid-column: span 2;
      }

      & > div:nth-child(4) {
        order: 1;
        grid-row: 3;
      }
    }

    @media screen and (min-width: 640px) {
      & .two_column {
        grid-template-columns: 1fr 1fr;
      }

      & .grid_layout {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 1fr;
        gap: 0.625rem;

        & > div:nth-child(1) {
          grid-row: 1;
          grid-column: span 3;
        }

        & > div:nth-child(2) {
          order: 0;
          grid-row: initial;
        }

        & div:nth-child(3) {
          grid-row: 2;
          grid-column: span 3;
        }

        & > div:nth-child(4) {
          order: 0;
          grid-row: initial;
        }
      }
    }
  }

  .form__container {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    @media screen and (min-width: 640px) {
      gap: 0.875rem;
    }
  }

  .forget_password {
    font-size: 12px;
    color: var(--gray-500);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-transform: capitalize;
    width: fit-content;
    &:hover {
      color: #0b5fff;
      cursor: pointer;
    }
  }

  .input_container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .label_with_icon {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > .hide_show {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        width: 50px;

        &:hover {
          cursor: pointer;
        }

        & p {
          color: var(--gray-700);
          font-size: 0.75rem;
        }
      }
    }

    label {
      color: var(--gray-700);
      font-size: 0.875rem;
    }
  }

  .warning__text {
    color: var(--error-500);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    & p {
      font-size: 14px;
    }
  }
  .button__style {
    font-weight: 700;
    font-size: 20px;
    border-radius: 15px;
    background-color: #ffd60a;
    min-height: 48px;
    @media (max-width: 920px) {
      font-size: 15px;
      width: 200px;
    }
  }
  .button_Container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
`;

export const Note = styled.p`
  font-size: 0.875rem;
  width: 95%;
  span {
    text-decoration: underline;
    text-underline-offset: 0.25rem;
    color: #1865e7;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: #fff;
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
  width: 100%;
  background-color: ${({ $primary }) => {
    return $primary ? "#FC2947" : "#0b5fff";
  }};
  color: white;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &.w-fit {
    width: fit-content;
  }

  &.visible {
    visibility: visible;
  }

  &.invisible {
    visibility: hidden;
  }
`;

export const InputContainerWithOutIcon = styled.div`
  position: relative;
  height: 100%;
  input,
  select,
  textarea {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border-radius: 5px;
    border: 1px solid #d0d5dd;
    word-spacing: 16;
    line-height: 1.5;
    position: relative;
    color: var(--gray-900);
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }

  select {
    height: 100%;
  }

  textarea {
    resize: vertical;
  }
`;

export const InputContainerWithIcon = styled.div`
  position: ${({ $isAbsolute }) => ($isAbsolute ? "absolute" : "relative")};

  input,
  select {
    width: 100%;
    padding: 0.625rem 0.875rem 0.625rem 2.1rem;
    border-radius: 5px;
    border: ${({ $isBorderNot }) =>
      $isBorderNot ? "none" : "1px solid #d0d5dd"};
    word-spacing: 16;
    line-height: 1.5;
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    color: var(--gray-900);
    background-color: transparent;
    z-index: 10;

    ${(props) =>
      props.$isRight &&
      css`
        padding: 0.625rem 2.1rem 0.625rem 0.875rem;
        box-shadow: none;
      `}
    &:focus {
      outline: none;
    }
  }

  select {
    height: 100%;
    padding: 0.5rem;
  }

  & .icon {
    position: absolute;
    padding: 0.625rem;
    top: 0;
    bottom: 0;
    color: var(--gray-400);
    background-color: transparent;

    ${(props) =>
      props.$isRight &&
      css`
        right: 0;
        background-color: transparent;
        z-index: 1;
      `}
  }

  ${(props) =>
    props.$isAbsolute &&
    css`
      width: 90px;
      z-index: 100;
      top: 1px;
      left: 1px;
      bottom: 1px;
    `}
`;

export const PasswordErrors = styled.ul`
  display: grid;
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
  padding: 0.5rem;
  font-size: 14px;
  transform: translateX(10px);
  & > li {
  }

  @media screen and (min-width: 420px) {
    grid-template-columns: 1fr 1fr;
  }
`;