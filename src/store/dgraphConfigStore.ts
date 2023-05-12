import create from 'zustand';

type State = {
  serverUrl: string,
  serverQueryTimeout: number,
  slashApiKey: string,
  authToken: string,
  setServerUrl: (url: string) => void,
  setServerQueryTimeout: (timeout: number) => void,
  setSlashApiKey: (key: string) => void,
  setAuthToken: (token: string) => void,
};

export const useDgraphConfigStore = create<State>((set) => ({
  serverUrl: 'http://localhost:8080',
  serverQueryTimeout: 0,
  slashApiKey: '', 
  authToken: '',
  setServerUrl: (url) => set({ serverUrl: url }),
  setServerQueryTimeout: (timeout) => set({ serverQueryTimeout: timeout }),
  setSlashApiKey: (key) => set({ slashApiKey: key }),
  setAuthToken: (token) => set({ authToken: token }),
}));
