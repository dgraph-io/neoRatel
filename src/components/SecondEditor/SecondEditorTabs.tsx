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
