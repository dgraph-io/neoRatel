// Copyright 2017-2023 Dgraph Labs, Inc. and Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import styled from '@emotion/styled';
import * as Tabs from '@radix-ui/react-tabs';

interface FlexProps {
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  height?: string;
}
export const TabListContainer = styled.div`
  display: flex;
  background-color: #333;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const TabList = styled(Tabs.List)`
  position: absolute; // Adicione esta linha
  bottom: 0; // Adicione esta linha
  width: 100%; // Adicione esta linha
  display: flex;
  background-color: #333;
  border-bottom: 1px solid #444;
`;


export const TabTrigger = styled(Tabs.Trigger)`
  padding: 8px 12px;
  background-color: #333;
  color: #d4d4d4;
  border: none;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }

  &[data-state='active'] {
    background-color: #1e1e1e;
    border-bottom: 2px solid #007acc;
    border-radius: 0; // Remover bordas arredondadas
  }
`;


export const TabContent = styled(Tabs.Content)`
height: 100%;
  width: 100%; // Adicione esta linha
  padding-top: 16px;
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding-right: 0px; // Aumentar o espaço à direita
  height: calc(100% - 30px); // Desconta a altura das tabs
  overflow: auto; // Habilita a rolagem quando necessário
  box-sizing: border-box;
  position: absolute; // Adicione esta linha
  top: 0; // Adicione esta linha
  left: 0; // Adicione esta linha
`;


export const EditorAreaStyled = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: column;
height: 100%;

.split {
  flex: 1;
  display: flex;
  height: 100%;
}

.split-pane {
  overflow: hidden;
  position: relative;
  height: 100%;
}

div[dir="ltr"] {
  height: 100% !important;
}

div[role="tablist"] {
  z-index: 10000;
}

.gutter {
  background-color: gray;
  background-clip: padding-box;
  z-index: 0;
  cursor: ew-resize;
}

  position: relative; // Adicione esta linha
  flex: 1;
  width: 100%;
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding-bottom: calc(22px + 42px); // Ajustar a altura da TabList e StatusBar
  margin-left: 80px; // A largura da barra lateral
  height: calc(100% - 22px); // Desconta a altura da StatusBar
`;


