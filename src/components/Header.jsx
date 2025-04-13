import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary";

export default function Header({onHandleNewUpload}) {
    return (
        <header>
            <Image
                src={"/google-drive.png"}
                alt={'Google Drive'}
                width={'150'}
                height={'100'}
            />
            <h1>David's storage</h1>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME}
                onSuccess={(results) => {
                    console.log(results);
                    onHandleNewUpload(results.info)
                }}
                onQueuesEnd={(results, {widget}) => {
                    widget.close();
                }}
            >
                {({open}) => {
                    function handleOnClick() {
                        open()
                    }

                    return (
                        <button className={"new-button"} onClick={handleOnClick}>+ New</button>
                    )
                }}
            </CldUploadWidget>
        </header>
    )
}