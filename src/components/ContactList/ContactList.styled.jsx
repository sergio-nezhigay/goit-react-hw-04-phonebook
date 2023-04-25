import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

export const Li = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  position: relative;
  padding-left: 25px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: ${props => props.theme.colors.dark};
    border-radius: 50%;
  }
`;

export const DeleteButton = styled.button`
  display: inline-block;
  font-size: 12px;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.accent};
  padding: 3px 10px;
  border-radius: 10px;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
  border: none;
  outline: none;
  &:hover {
    box-shadow: none;
  }
`;

export const Text = styled.p`
  font-size: 24px;
  font-weight: 500;
`;
