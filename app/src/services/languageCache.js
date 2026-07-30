import { Storage } from "./storage";

const LANGUAGE_KEY = "language";

export const LanguageCache = {

    save(language) {

        Storage.save(LANGUAGE_KEY, language);

    },

    load() {

        return Storage.load(LANGUAGE_KEY);

    }

};