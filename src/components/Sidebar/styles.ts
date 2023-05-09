import styled from '@emotion/styled';

export const SidebarContainer = styled.div`
  width: 40px;
  height: 100vh;
  background-color: #2d2d2d;
  color: #d4d4d4;
  position: fixed;
  padding: 16px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 0;
  top: 0;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2); // Sombra para a direita da barra lateral
  z-index: 10;
`;

export const IconContainer = styled.div`
  align-items: center;
`;

export const IconSpacing = styled.div`
padding-top:18px;
`;


export  const Sidebar = styled.div`
background-color: #1e1e1e;
`;
