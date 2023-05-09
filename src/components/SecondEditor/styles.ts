import styled from '@emotion/styled';
import * as Tabs from '@radix-ui/react-tabs';

export const SecondTabList = styled(Tabs.List)`
  &[data-orientation='horizontal'] {
    display: flex;
    margin-bottom: 9px;
    position: absolute; // Adiciona a propriedade 'position' aqui
    bottom: 0;
    width: 90%;
    justify-content: space-between; // Distribui as abas igualmente na área disponível
    margin-top: auto; // Coloca as abas na parte inferior
  }
`;

export const SecondTabTrigger = styled(Tabs.Trigger)`
  &[data-orientation='horizontal'] {
    flex: 1; // Faz com que cada aba ocupe todo o espaço disponível
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    text-align: center; // Centraliza o texto e ícones dentro das abas
    background-color: #333;
    color: #d4d4d4;
    &:hover {
      background-color: #444;
    }
    &[data-state='active'] {
      background-color: #555;
    }
  }
`;

export const SecondTabContent = styled(Tabs.Content)`
  &[data-orientation='horizontal'] {
    display: none;
    &[data-state='active'] {
      display: block; // Estilos personalizados para o conteúdo das abas
      height: 100%;
      padding: 16px;
      background-color: #1e1e1e;
      color: #d4d4d4;
    }
  }
`;
