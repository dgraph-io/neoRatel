import create from 'zustand';

const useResultStore = create(set => ({
  result: {},
  defaultTab: "json",  // Default tab should be graphView
  setResult: (result: any) => set(() => ({ result })),
  setDefaultTab: (tab: any) => set(() => ({ defaultTab: tab })),  // Setter for default tab
}));

export default useResultStore;
