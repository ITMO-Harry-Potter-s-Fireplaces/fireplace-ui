import styled from 'styled-components';

const InputFormWrapper = styled.div`
  position: relative;
  padding: 15px 0 0;
  margin-top: 5px;
  width: 100%;

  & input {
    font-family: sans-serif;
    width: 70%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.1rem;
    color: #9b9b9b;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: red;
    }

    &:focus {
      &::placeholder {
        color: transparent;
      }
      padding-bottom: 6px;
      border-width: 3px;
      border-image: linear-gradient(to right, #2196f3, #bbdefb);
      border-image-slice: 1;
    }

    &:required,
    &:invalid {
      box-shadow: none;
    }
  }

  & label {
    font-size: 1rem;
    color: #9b9b9b;
    font-family: sans-serif;
    position: absolute;
    bottom: 40px;
  }
`;

const Button = styled.button`
  background-color: #87c6f8;
  cursor: pointer;
  user-select: none;
  border: 1px solid #ffffff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
  border-radius: 6px;
  color: white;
  display: block;
  width: 230px;
  margin: 5% auto;
  font-family: sans-serif;
  font-size: 18px;
  text-align: center;
  height: 40px;
  line-height: 20px;
  margin-bottom: 10px;
  padding: 4px 6px;
  text-decoration: none;
  &:hover,
  &:focus {
    border-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.3);
    outline: 0 none;
  }
`;

const Error = styled.text`
  color: #8b0000;
  font-size: 0.8rem;
  font-family: sans-serife;
  text-decoration: none;
  position: absolute;
  right: 0px;
  top: 10px;
  padding-right: 67px;

  @media (max-width: 500px) {
    padding-right: 60px;
  }
`;

const Link = styled.a`
  color: #9b9b9b;
  text-decoration: none;
  position: absolute;
  padding-right: 67px;
  right: 0;
  font-family: sans-serife;

  @media (max-width: 500px) {
    padding-right: 60px;
  }
`;

const Transfer = styled.a`
  position: absolute;
  left: 176px;
  color: #3eacdc;
  text-decoration: none;
  font-family: sans-serife;

  @media (max-width: 500px) {
    left: 150px;
  }
`;

export {Button, InputFormWrapper, Link, Error, Transfer};
