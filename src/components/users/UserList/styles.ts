import styled from 'styled-components';

export const User = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
  padding-bottom: 15px;

  &:last-child {
    padding: 0;
    margin: 0;
    border: none;
  }

  h4 {
    margin-bottom: 5px;
    font-size: 1em;
    line-height: 100%;
  }
  span {
    color: ${(props) => props.theme.palette.text.secondary};
    font-size: 0.9em;
    line-height: 100%;
    font-weight: lighter;
  }
`;

export const Avatar = styled.div<{ src: string }>`
  height: 42px;
  width: 42px;
  overflow: hidden;
  border-radius: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  margin-right: 10px;
`;
