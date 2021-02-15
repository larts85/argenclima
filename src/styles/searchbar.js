import styled from "styled-components";
import { colors, device } from "../styles/globalStyles";

export const SB = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  margin-right: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & label {
    font-size: 1.5em;
    color: ${colors.blue};
    height: 30px;
    text-decoration: none;
  }
  & Link {
    /* display: flex; */
    /* align-items: flex-end; */
  }
  & select {
    box-shadow: 3px 3px 3px -2px black;
    border: 0px;
    background-color: ${colors.lightBlue};
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 40px;
    margin: 0px;
    font-family: "Sofadi One", cursive;
    font-size: 1.1em;
    padding-left: 10px;
    outline: none;
  }
  & select:hover {
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  & option {
    font-size: 0.9em;
    font-style: italic;
  }
  @media ${device.tablet} {
    flex-direction: column;
    margin: 0;
    padding: 0;
    & select {
      height: 40px;
    }
  }
`;