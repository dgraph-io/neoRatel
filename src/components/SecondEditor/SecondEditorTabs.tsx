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

import React from 'react';
import { SecondTabList, SecondTabTrigger, SecondTabContent } from './styles';
import * as Tabs from '@radix-ui/react-tabs';
import { FiActivity, FiCode, FiMapPin } from 'react-icons/fi';


export const SecondEditorTabs = () => {
  return (
    <Tabs.Root defaultValue="graphView">
      <SecondTabList>
        <SecondTabTrigger value="graphView">
          {/* Insira o ícone aqui */}
          <FiActivity /> Graph View
        </SecondTabTrigger>
        <SecondTabTrigger value="json">
          {/* Insira o ícone aqui */}
          <FiCode /> JSON
        </SecondTabTrigger>
        <SecondTabTrigger value="geo">
          {/* Insira o ícone aqui */}
          <FiMapPin /> Geo
        </SecondTabTrigger>
      </SecondTabList>
      <SecondTabContent value="graphView">Graph View Content</SecondTabContent>
      <SecondTabContent value="json">JSON Content</SecondTabContent>
      <SecondTabContent value="geo">Geo Content</SecondTabContent>
    </Tabs.Root>
  );
};
