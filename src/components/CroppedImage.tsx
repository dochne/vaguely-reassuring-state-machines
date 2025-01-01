import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { imageCropper } from "../helpers/image-cropper";

interface Props {
    src: string;
    alt: string;
} 

export function CroppedImage({src, alt}: Props)
{
    const [image, setImage] = useState<string|null>(null);
    useEffect(() => {
        (async () => setImage(await imageCropper(src)))()
    }, [src])

    if (!image) {
        return <Loading />
    }
    return <img src={image} alt={alt} style={{maxHeight: '300px', width: 'auto', maxWidth: '100%'}}/>
}