import {CldVideoPlayer} from "next-cloudinary";
import {useEffect, useState} from "react";
import {saveAs} from "file-saver";

export default function VideoCard({asset}) {
    const {public_id, display_name} = asset;
    const [isLoading, setIsLoading] = useState(false)
    const [retries, setRetries] = useState(0)
    const [errorOccurred, seterrorOccurred] = useState(false)

    const downloadOriginal = () => {
        const vidSrc = asset.url;
        saveAs(vidSrc, display_name);
    }

    const handleVideoError = (err) => {
        if(err?.player?.videojs?.error_?.statusCode === 423){
            if(!errorOccurred){
                seterrorOccurred(true)
                setIsLoading(true)
                setRetries((prev) => prev + 1)
                console.log("Retrying")
            }
        }
    }

    const onHandleMetaDataLoad = () => {
        setIsLoading(true)
        seterrorOccurred(true)
    }

    useEffect(() => {
        if(errorOccurred){
            const intervalId = setInterval(()=>{
                setRetries(prev => prev + 1)
            }, 5000)

            return () => clearInterval(intervalId)
        }
    }, [errorOccurred])

    useEffect(() => {
        if(retries > 0 && !isLoading){
            setIsLoading(false)
        }
    }, [retries])

    return (
        <article className="card">
            <div className="title-container">
                <h4><span className={'emoji'}>⏵</span>{display_name}</h4>
            </div>
            {isLoading && <div className="spinner"></div>}

            <div className={"video-container"} style={{ visibility: isLoading ? "hidden" : "visible" }}>
                <CldVideoPlayer
                src={public_id}
                id={`${public_id}-${Math.random()}`}
                height={300}
                width={450}
                alt={display_name}
                onError={handleVideoError}
                onMute={onHandleMetaDataLoad}
                />
                <div className={"controls-container"}>
                    <div className={"control-container"}>
                        <button className={"download-btn"} onClick={downloadOriginal}>↓ Download Original</button>
                    </div>
                </div>
            </div>
        </article>
    )
}