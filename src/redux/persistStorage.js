import AsyncStorage from "@react-native-async-storage/async-storage";

const persistStorage = {
    getItem: async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.error(`Error getting item ${key} from localStorage`, error);
            return null;
        }
    },
    setItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(`Error setting item ${key} to localStorage`, error);
        }
    },
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item ${key} from localStorage`, error);
        }
    },
};

export default persistStorage
