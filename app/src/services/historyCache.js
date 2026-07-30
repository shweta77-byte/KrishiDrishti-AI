import { Storage } from "./storage";

const HISTORY_KEY = "prediction_history";

export const HistoryCache = {

    save(history) {

        Storage.save(HISTORY_KEY, history);

    },

    load() {

        return Storage.load(HISTORY_KEY) || [];

    }

};