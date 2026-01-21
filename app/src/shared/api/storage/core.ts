// Simulate network delay
export const simulateDelay = (min = 300, max = 1000) =>
  new Promise(resolve => setTimeout(resolve, min + Math.random() * (max - min)));

// Generic storage helper
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage`, error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  }
};

export const generateId = () => crypto.randomUUID();
