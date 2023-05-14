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

import React, { useRef, useEffect, useState, useContext } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { editor, KeyCode, KeyMod } from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';
import { useTabsStore } from '../../store/tabsStore';
import { TabList, TabTrigger, TabContent, EditorAreaStyled, TabListContainer } from './styles';
import { debounce } from 'lodash';

import FloatingControl from '../FloatingControl/index';

import WelcomePage from '../Welcome/WelcomePage';

import { SecondEditorTabs } from '../SecondEditor/SecondEditorTabs';

import Split from 'react-split';

import AddTabDialog from '../TabDialog/TabDialog';

import DgraphService from '../../services/dgraphService';

import '../../userWorker';

import { func } from '../../monaco-editor-languages';

const init = func();

export const EditorArea = () => {

  // function toggleTheme() {
  //   const htmlElement = document.querySelector('html');
  //   const currentTheme = htmlElement.getAttribute('data-theme');

  //   if (currentTheme === 'dark') {
  //     htmlElement.setAttribute('data-theme', 'light');
  //   } else {
  //     htmlElement.setAttribute('data-theme', 'dark');
  //   }
  // }

  const htmlElement = document.querySelector('html');
  htmlElement.setAttribute('data-theme', 'dark');

  const tabs = useTabsStore((state) => state.tabs);
  const activeTab = useTabsStore((state) => state.activeTabId);
  const editorLanguage = activeTab?.type === 'GraphQL' ? 'graphql' : activeTab?.type === 'JSON' ? 'json' : 'plaintext';

  const setActiveTab = useTabsStore((state) => state.switchTab);
  const updateTabContent = useTabsStore((state) => state.updateTabContent);
  const removeTab = useTabsStore((state) => state.removeTab);

  const editorRef = useRef(null);
  const [splitSizes, setSplitSizes] = useState<[number, number]>([50, 50]);

  const handleEditorChange = (newValue: string) => {
    updateTabContent(activeTab, newValue);
  };

  const handleQuery = async (query: string) => {
    try {
      const response = await DgraphService.query(query, activeTab);
      console.log('Query response:', response);
    } catch (err) {
      console.error('Error running query:', err);
    }
    return null;
  };

  const handleRemoveTab = () => {
    removeTab(activeTab);
  };


  const handleEditorChangeED = debounce((newValue: string) => {
    if (activeTab) {
      const currentContent = editorRef.current.getValue();
      handleEditorChange(currentContent);
    }
  }, 17000);

  const _handleEditorChange = () => {
    if (editorRef.current) {
      const currentContent = editorRef.current.getValue();
      handleEditorChange(currentContent);
    }
  };

  // graphql

  const graphqlEndpoint = activeTab?.graphqlEndpoint || 'https://api.spacex.land/graphql/';
  const defaultOperations = activeTab?.defaultOperations || '';
  const defaultVariables = activeTab?.defaultVariables || '';


  const CustomMonacoEditor = (e: object) => {
    let { id, title, content, type, language, Endpoint, defaultOperations, defaultVariables } = e.e.value;
    const { editorRef } = e;

    const editorRefM = useRef(null);

    const removeAllTabs = useTabsStore((state) => state.removeAllTabs);

    function deleteAllTabs() {
      removeAllTabs();
    }

    useEffect(() => {
      if (editorRef.current) {
        const runDQL = {
          id: 'my-unique-id',
          label: 'Run Query',
          keybindings: [
            KeyCode.F10
          ],
          contextMenuGroupId: 'navigation',
          contextMenuOrder: 1.5,
          run: async function (ed) {
            const query = ed.getValue();
            console.log('Running query!', query);
            handleQuery(query);
          },
        };
        const save = {
          id: 'my-save-command',
          label: 'Save',
          keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS],
          contextMenuGroupId: 'navigation',
          contextMenuOrder: 1.5,
          run: function (ed) {
            console.log("Save command triggered");
            console.log(ed.getValue());
            handleEditorChange(ed.getValue());
            // Aqui você pode implementar a lógica para salvar o conteúdo do editor
          }
        }
        const del = {
          id: 'del-my-unique-id',
          label: 'Delete Tab',
          keybindings: [
            KeyMod.Shift | KeyCode.Delete,
          ],
          contextMenuGroupId: 'navigation',
          contextMenuOrder: 2.5,
          run: function (ed) {
            handleRemoveTab();
            console.log('DELETE!');
            return null;
          },
        };
        const removeAll = {
          id: 'rw-my-unique-id',
          label: 'Remove All Tabs',
          keybindings: [
            KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Delete,
          ],
          contextMenuGroupId: 'navigation',
          contextMenuOrder: 3.5,
          run: function (ed) {
            deleteAllTabs();
            console.log('REMOVE ALL!');
            return null;
          },
        };

        editorRef.current.addAction(runDQL);
        editorRef.current.addAction(save);
        editorRef.current.addAction(del);
        editorRef.current.addAction(removeAll);

      }
    }, [editorRef]);

    return (
      <MonacoEditor
        width="100%"
        height="100%"
        language={language}
        theme="vs-dark"
        value={content}
        onChange={handleEditorChangeED}
        editorDidMount={(editor) => {
          editorRef.current = null;
          editorRef.current = editor;
          editor.focus();
        }}
        editorWillUnmount={() => {
          editorRef.current = null;
        }}
      />
    );
  };

  const togglePanel = () => {
    if (splitSizes[0] === 0) {
      setSplitSizes([50, 50]);
    } else {
      setSplitSizes([0, 100]);
    }
  };


  const RenderMonaco = (value: any) => {
    let { id, title, content, type, language, Endpoint, defaultOperations, defaultVariables } = value.value;

    const handlePlay = () => {
      // execute the code in the editor
      console.log('play');
      const currentContent = editorRef.current.getValue();
      handleEditorChange(currentContent);
      handleQuery(currentContent);
    };

    const handleClear = () => {
      // clear the editor content
      console.log('clear');
      handleEditorChange('');
    };

    const handleClone = () => {
      // clone the current tab
      console.log('clone');
    };

    const handlePlus = () => {
      // add a new tab
      console.log('plus');
    };

    const handleSettings = () => {
      // open settings
      console.log('settings');
    };

    switch (language) {
      case 'dql':
        return <Split
          className="split"
          sizes={splitSizes}
          minSize={10}
          gutterSize={10}
          onDoubleClick={() => {
            togglePanel();
            _handleEditorChange();
          }}
          onDragEnd={(newSizes) => {
            setSplitSizes(newSizes);
            _handleEditorChange();
          }}

          direction="horizontal"
        >
          <div className="split-pane">
            <FloatingControl
              onPlay={handlePlay}
              onClear={handleClear}
              onClone={handleClone}
              onPlus={handlePlus}
              onSettings={handleSettings}
            />
            <CustomMonacoEditor e={value} editorRef={editorRef} />
            {/* <DQLEditor value={content} /> */}

          </div>
          <div className="split-pane">
            <SecondEditorTabs />
          </div>
        </Split>

      case 'graphql':
        return <CustomMonacoEditor e={value} editorRef={editorRef} />;
      case 'json':
        return <CustomMonacoEditor e={value} editorRef={editorRef} />;
      case 'json':
        return <CustomMonacoEditor e={value} editorRef={editorRef} />;
      default:
        return <CustomMonacoEditor e={value} editorRef={editorRef} />;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      editorRef.current?.layout();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <EditorAreaStyled>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <>
          {tabs.length < 1 ? (
            <WelcomePage />
          ) : (
            tabs.map((tab) => (
              <TabContent key={tab.id} value={tab.id}>
                <React.StrictMode>
                  <RenderMonaco value={tab} />
                </React.StrictMode>
              </TabContent>
            ))
          )}
          <TabListContainer>
            <TabList>
              {tabs.map((tab) => (
                <TabTrigger key={tab.id} value={tab.id}>
                  {tab.title}
                </TabTrigger>
              ))}
              <AddTabDialog />
            </TabList>
          </TabListContainer>
        </>
      </Tabs.Root>
    </EditorAreaStyled>
  );
};
