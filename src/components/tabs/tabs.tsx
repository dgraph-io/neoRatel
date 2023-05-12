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
import * as ContextMenu from '@radix-ui/react-context-menu';
import { debounce } from 'lodash';

import WelcomePage from '../Welcome/WelcomePage';

import { SecondEditorTabs } from '../SecondEditor/SecondEditorTabs';

import Split from 'react-split';

import AddTabDialog from '../TabDialog/TabDialog';

import DgraphService from '../../services/dgraphService';

import '../../userWorker';

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

  const handleEditorChange = (newValue: string) => {
    updateTabContent(activeTab, newValue);
  };

  const handleEditorChangeED = debounce((newValue: string) => {
    if (activeTab) {
      updateTabContent(activeTab, newValue);
    }
  }, 1000);

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

    const removeAllTabs = useTabsStore((state) => state.removeAllTabs);

    function deleteAllTabs() {
      removeAllTabs();
    }

    useEffect(() => {
      if (editorRef.current) {
        const myAction = {
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
            try {
              const response = await DgraphService.query(query, activeTab);
              console.log('Query response:', response);
            } catch (err) {
              console.error('Error running query:', err);
            }
            return null;
          },
        };
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

        editorRef.current.addAction(myAction);
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
          editorRef.current = editor;
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
          onDrag={(newSizes) => {
            setSplitSizes(newSizes);
            _handleEditorChange();
          }}
          direction="horizontal"
        >
          <div className="split-pane">
            <CustomMonacoEditor e={value} editorRef={editorRef} />
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
        return <>
          <ContextMenu.Root>
            <ContextMenu.Trigger className="ContextMenuTrigger">
              <div>Select a tab</div>;
            </ContextMenu.Trigger>
            <ContextMenu.Content
              className="ContextMenuContent"
              open={Boolean(contextMenuProps)}
              onOpenChange={handleHideContextMenu}
            >
              <ContextMenu.Item onSelect={handleCopy} className="ContextMenuItem">Run Query</ContextMenu.Item>
              <ContextMenu.Item onSelect={handleAlert} className="ContextMenuItem">Save Query</ContextMenu.Item>
              <ContextMenu.Item onSelect={handlePaste} className="ContextMenuItem">Clean Query</ContextMenu.Item>
              <ContextMenu.Item onSelect={handleRemoveTab} className="ContextMenuItem">Delete Tab</ContextMenu.Item>

              <ContextMenu.Separator />
            </ContextMenu.Content>


          </ContextMenu.Root>
        </>
    }
  };


  const [splitSizes, setSplitSizes] = useState<[number, number]>([50, 50]);


  const handleRemoveTab = () => {
    removeTab(activeTab);
    handleHideContextMenu();
  };

  const editorOptions = {
    theme: 'vs-dark',
    editorLanguage,
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

  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current.layout();
      }, 0);
    }
  }, [splitSizes]);


  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  }, [activeTab]);


  const [contextMenuProps, setContextMenuProps] = React.useState(null);

  const handleContextMenu = ({ x, y }) => {
    console.log('context menu');
    setContextMenuProps({
      left: x + 'px',
      top: y + 'px',
    });
  };


  const handleHideContextMenu = () => {
    setContextMenuProps(null);
  };

  const handleCopy = () => {
    const editor = editorRef.current;
    const selection = editor.getSelection();
    const text = editor.getModel().getValueInRange(selection);
    navigator.clipboard.writeText(text);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      const editor = editorRef.current;
      const position = editor.getPosition();
      editor.executeEdits('paste', [{ range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column), text: text }]);
    });
  };

  const handleAlert = () => {
    alert("Olá! Você selecionou 'Exibir alerta' no menu de contexto.");
  };


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
