import styled from '@emotion/styled';

export const InputShort = styled.input`
  display: block;
  width: 50%;
  background: #ecf0f3;
  padding: 10px;
  padding-left: 20px;
  height: 40px;
  font-size: 13px;
  border-radius: 50px;
  box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
  border: none;
  outline: none;
  &::placeholder {
    color: gray;
  }
  &:focus {
    border: 2px solid ${props => props.theme.colors.accent};
  }
`;
