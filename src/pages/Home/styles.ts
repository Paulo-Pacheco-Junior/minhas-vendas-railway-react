import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  main {
    padding-top: 3.5rem;
    padding-left: 10rem;
  }

  p {
    text-align: center;
  }
`;

export const NewSaleBtn = styled(Link)`
  display: block;
  position: fixed;
  bottom: 30px;
  right: 40px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.COLORS.BG_ORANGE};
  color: black;
  background-color: #8af24e;
  color: #192b1c;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.2rem 1.6rem;
  outline: none;
  border: none;
  border-radius: 0.8rem;
`;

export const ScrollBtn = styled.button`
  display: block;
  position: fixed;
  bottom: 30px;
  right: 40px;
  text-decoration: none;
  /* background-color: ${({ theme }) => theme.COLORS.BG_ORANGE}; */
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 0.2rem 0.8rem;
  outline: none;
  border: none;
  border-radius: 0.8rem;
  opacity: 0.5;
`;

export const AgentRoleButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 3rem;

  button {
    text-align: center;
    font-size: 1.5rem;
    color: white;
    font-weight: 700;
    padding: 0.6rem 1.6rem;
    background-color: transparent;
    border-radius: 8px;

    &.selected {
      background-color: #8bf24e;
      color: #192b1c;
    }
  }
`;
