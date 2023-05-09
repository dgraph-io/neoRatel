import React from 'react';
import { StatusBarContainer } from './styles'; // Adicione o arquivo de estilo
import { CheckCircledIcon } from '@radix-ui/react-icons'; // Importe o ícone


export const StatusBar = () => {
    return (
      <StatusBarContainer >
        <CheckCircledIcon  style={{ color: 'green' }}/>
        <span>Connected to http://localhost:8080 | Namespace: 0x1 | User: groot </span>
      </StatusBarContainer>
    );
  };
  