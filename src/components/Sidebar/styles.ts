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
