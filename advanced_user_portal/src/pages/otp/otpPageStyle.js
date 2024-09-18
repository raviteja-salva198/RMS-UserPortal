import styled from "styled-components";
export const OtpPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  font-family: "Arial", sans-serif;

  .container {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
  }

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .description {
    text-align: center;
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .otp-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;

    input {
      width: 2rem !important;
      height: 2rem;
      margin: 0 0.5rem;
      font-size: 1.25rem;
      text-align: center;
      border: 2px solid #ddd;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.3s;

      &:focus {
        border-color: #0b5fff;
      }
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .primary-btn,
  .secondary-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .primary-btn {
    background-color: #0b5fff;
    color: white;

    &:hover {
      background-color: #0a4cd6;
    }

    &:disabled {
      background-color: #a0c0ff;
      cursor: not-allowed;
    }
  }

  .secondary-btn {
    background-color: #f0f2f5;
    color: #333;

    &:hover {
      background-color: #e4e6e9;
    }
  }

  .resend-otp {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    color: #0b5fff;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }

    p {
      margin-left: 0.5rem;
    }
  }
`;