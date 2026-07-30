import { useEffect, useState } from "react";

function OfflineStatus() {

    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {

        const onlineHandler = () => setOnline(true);

        const offlineHandler = () => setOnline(false);

        window.addEventListener("online", onlineHandler);

        window.addEventListener("offline", offlineHandler);

        return () => {

            window.removeEventListener("online", onlineHandler);

            window.removeEventListener("offline", offlineHandler);

        };

    }, []);

    return (

        <div
            style={{
                marginTop:20,
                padding:15,
                borderRadius:12,
                background: online ? "#dcfce7" : "#fee2e2",
                textAlign:"center",
                fontWeight:"bold"
            }}
        >

            {online
                ? "🟢 Online Mode"
                : "🔴 Offline Mode (Cached data available)"}

        </div>

    );

}

export default OfflineStatus;