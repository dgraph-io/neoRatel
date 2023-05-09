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

interface FlexProps {
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    height?: string;
  }
  
  export  const Flex = styled.div<FlexProps>`
    display: flex;
    ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
    ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
    ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
    ${({ height }) => height && `height: ${height};`}
  `;
  

  export const EditorArea = styled.div`
    flex: 1;
    width: 100%; // A largura da barra lateral atualizada
    background-color: #00a2f3;
    color: #d4d4d4;
    padding-bottom: 22px; // A altura da barra de status
    margin-left: 93px; // A largura da barra lateral
  `;
  
  

  
  export  const MainContent = styled(Flex)`
    width: 100%;
    // background-color: green;
    height: calc(100vh - 22px); // Desconta a altura da StatusBar
    flex-direction: column;
    overflow: hidden; // Adicionado para remover as barras de rolagem
  `;
  
  