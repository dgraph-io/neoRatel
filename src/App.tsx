import React from 'react';

import { MainContent } from './components/styles';
import { EditorArea } from './components/tabs/tabs';
import { StatusBar } from './components/StatusBar/StatusBar';
import Sidebar from './components/Sidebar/Sidebar';

const App: React.FC = () => {
  return (
    <>
      <Sidebar />
      <MainContent>
        <EditorArea />
        <StatusBar />
      </MainContent>
    </>
  );
}

export default App;
