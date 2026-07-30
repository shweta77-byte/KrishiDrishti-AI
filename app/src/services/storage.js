// Generic Local Storage Helper

export const Storage = {

    save(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

        } catch (err) {

            console.error("Storage Save Error:", err);

        }

    },

    load(key) {

        try {

            const data = localStorage.getItem(key);

            return data
                ? JSON.parse(data)
                : null;

        } catch (err) {

            console.error("Storage Load Error:", err);

            return null;

        }

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    clear() {

        localStorage.clear();

    }

};