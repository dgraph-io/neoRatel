import styled from '@emotion/styled';

export const StatusBarContainer = styled.div`
    background-color: #333;
    height: 22px;
    color: #d4d4d4;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    padding-left: 10px;
    span {
        font-size: 12px;
        margin-left: 15px; // Exemplo: adicione uma margem à esquerda
      }
`;


export const StatusBar = styled.div`
background-color: #333;
height: 22px;
color: #d4d4d4;
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 10;
`;