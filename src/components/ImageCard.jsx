import {CldImage} from "next-cloudinary";
import {useState} from "react";
import {saveAs} from "file-saver"

export default function ImageCard({asset}) {
    const [removeBackground, setRemoveBackground] = useState(false)
    const [grayscale, setGrayscale] = useState(false)
    const [prompt, setPrompt] = useState("")

    const {public_id, display_name} = asset;

    const downloadImage = () => {
        const imgSrc = document.getElementById(public_id).src
        saveAs(imgSrc, display_name);
    }
    return (
        <article className={'card'}>
            <div className={'title-container'}>
                <h4><span className={'emoji'}>ᝰ </span>{display_name}</h4>
            </div>
            <CldImage
                className={'display-image'}
                alt={display_name}
                src={public_id}
                width={300}
                height={300}
                id={public_id}
                removeBackground={removeBackground}
                grayscale={grayscale}
                replaceBackground={prompt}
                crop={{
                    type: 'auto',
                    source: true
                }}
            />
            <div className={'controls-container'}>

                <div className={'control-container'}>
                    <input type={"checkbox"} id={"checkbox"+display_name} name={"background"} onChange={() => {setRemoveBackground(!removeBackground)}} />
                    <label htmlFor={"checkbox"+display_name}>No background</label>
                </div>

                <div className={'control-container'}>
                    <input type={"checkbox"} id={"grayscale"+display_name} name={"grayscale"} onChange={() => {setGrayscale(!grayscale)}} />
                    <label htmlFor={'grayscale'+display_name}>Grayscale</label>
                </div>

                <button className={"download-btn"} onClick={downloadImage}>↓ Download</button>

            </div>

            <input className={'drive-input'} type={'text'} value={prompt} placeholder={'Start typing to change background'} onChange={(event) => {setPrompt(event.target.value)}} />
        </article>
    )
}