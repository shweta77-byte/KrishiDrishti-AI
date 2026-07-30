import { useEffect, useState } from "react";

function OfflineBanner(){

    const [online,setOnline] = useState(
        navigator.onLine
    );


    useEffect(()=>{

        function onlineHandler(){
            setOnline(true);
        }

        function offlineHandler(){
            setOnline(false);
        }


        window.addEventListener(
            "online",
            onlineHandler
        );

        window.addEventListener(
            "offline",
            offlineHandler
        );


        return ()=>{

            window.removeEventListener(
                "online",
                onlineHandler
            );

            window.removeEventListener(
                "offline",
                offlineHandler
            );

        }


    },[]);


    if(online) return null;


    return(

        <div className="offline-banner">

            📡 Offline Mode Active

            <br/>

            Previous crop data is available.

            <br/>

            Predictions will sync when internet returns.

        </div>

    );

}


export default OfflineBanner;