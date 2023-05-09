import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface Tab {
    id: number;
    title: string;
    content: string;
    type: string;
    language: string;
    Endpoint: string;
    defaultOperations: string;
    defaultVariables: string;
  }

type TabsStore = {
    tabs: Tab[];
    activeTabId: number;
    addTab: (type: string) => void;
    removeAllTabs: () => void;
    removeTab: (id: number) => void;
    switchTab: (id: number) => void;
    updateTabContent: (id: number, content: string) => void;
};

export const useTabsStore = create<TabsStore>((set, get) => ({
    tabs: [],
    activeTabId: 1,
    removeAllTabs: () =>
    set((state) => ({
      ...state,
      tabs: [],
    })),
    addTab: (type) => {
        const tabs = get().tabs;
        const newId = tabs.length > 0 ? Math.max(...tabs.map((tab) => tab.id)) + 1 : 1;
        const formattedString = `{\n\tq(func: Type(User)) {\n \t expand(_all_)\n\t}\n}`;

        
        let language;
        let content = `# Write your DQL query here \n\n${formattedString}`;
        let Endpoint = 'http://localhost:8080';
        let defaultOperations = '';
        let defaultVariables = '';

        if (type === 'GraphQL' || type === 'graphql') {
          language = 'graphql';
          Endpoint = 'https://api.spacex.land/graphql/';
          content = ' query {\n\tlaunchesPast(limit: 5) {\n\t\tmission_name\n\t\tlaunch_date_local\n\t\tlaunch_site {\n\t\t\tsite_name_long\n\t\t}\n\t\tlinks {\n\t\t\tvideo_link\n\t\t}\n\t\trocket {\n\t\t\trocket_name\n\t\t}\n\t}\n}';
        } else if (type === 'JSON View') {
          language = 'json';
          content = '{\n\t"set": [{}]\n}';
        } else if (type === 'DQL') {
          language = 'dql';
        } else {
          language = 'plaintext';
        }

        set({
            tabs: [...tabs, { id: newId, title: `${type} ${newId}`, type, content, language, Endpoint, defaultOperations, defaultVariables}],
            activeTabId: newId,
          });
    },
    removeTab: (id: number) => set((state) => {
        const tabIndex = state.tabs.findIndex((tab) => tab.id === id);
        if (tabIndex === -1) return;
        const newTabs = state.tabs.filter((tab) => tab.id !== id);
        const newActiveTab = state.activeTabId === id
            ? newTabs[tabIndex] ? newTabs[tabIndex].id : newTabs[tabIndex - 1]?.id
            : state.activeTabId;
        return { tabs: newTabs, activeTabId: newActiveTab };
    }),

    switchTab: (id: number) => {
        set({ activeTabId: id });
    },
    updateTabContent: (id: number, content: string) => {
        const updatedTabs = get().tabs.map((tab) => (tab.id === id ? { ...tab, content } : tab));
        set({ tabs: updatedTabs });
    },
}));


if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useTabsStore);
}