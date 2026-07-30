import { useEffect, useState } from "react";

function NetworkStatus() {

    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {

        const goOnline = () => setOnline(true);
        const goOffline = () => setOnline(false);

        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };

    }, []);

    return (

        <div className={`network-status ${online ? "online" : "offline"}`}>

            {online ? (
                <>🟢 Online Mode • Live AI & Weather Available</>
            ) : (
                <>🔴 Offline Mode • Using Saved Data</>
            )}

        </div>

    );

}

export default NetworkStatus;