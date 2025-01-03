import { create } from "zustand";

interface MockServiceWorkerState {
  isReady: boolean;
  setWorkerReady: () => void;
}

const useMockServiceWorkerState = create<MockServiceWorkerState>((set) => ({
  isReady: false,
  setWorkerReady: () => set(() => ({ isReady: true })),
}));

export default useMockServiceWorkerState;
