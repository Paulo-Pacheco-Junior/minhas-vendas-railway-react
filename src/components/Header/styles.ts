import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  padding: 1.4rem 4rem;
  margin-bottom: 2.2rem;

  > nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 1.4rem 2.6rem;
    margin-bottom: 1rem;
  }
`;

export const NavBtn = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  margin: 2rem 0;
  background-color: ${({ theme }) => theme.COLORS.BG_GRAY_700};
  color: ${({ theme }) => theme.COLORS.GRAY_100};

  text-decoration-thickness: 12%;
  text-decoration-color: #8bf24e;
  text-underline-offset: 3px;

  &:hover {
    filter: brightness(1);
    transition: 0.2s;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;
