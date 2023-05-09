import styled from '@emotion/styled';

export const AddTabButton = styled.button`
background-color: #333;
color: #d4d4d4;
border: none;
font-size: 14px;
padding: 8px;
cursor: pointer;
transition: background-color 0.2s;

&:hover {
  background-color: #444;
}
`;


// export const DialogOverlay = styled(Dialog.Overlay)`
//   background-color: rgba(0, 0, 0, 0.5);
//   inset: 0;
//   position: fixed;
// `;

// export const DialogContent = styled(Dialog.Content)`
//   background-color: white;
//   border-radius: 6px;
//   padding: 16px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 90%;
//   max-width: 400px;
// `;