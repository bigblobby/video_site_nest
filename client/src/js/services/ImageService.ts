import { nanoid } from 'nanoid';

class ImageHelper {

    fileListBase64(fileList){
        function getBase64(file) {
            const reader = new FileReader();
            return new Promise(resolve => {
                reader.readAsDataURL(file);

                reader.addEventListener('load', (e) => {
                    const image = new Image();

                    if (typeof e.target.result === "string") {
                        image.src = e.target.result;
                    }

                    image.addEventListener('load', (loadImageEvent) => {
                        const path = loadImageEvent.composedPath && loadImageEvent.composedPath();
                        const image = path[0] as HTMLImageElement;

                        const newFile = {
                            id: nanoid(),
                            displayImage: e.target.result,
                            uploadImage: file,
                            width: image.width,
                            height: image.height
                        };

                        resolve(newFile);
                    });
                });
            })
        }

        const promises = [];

        for(let i = 0; i < fileList.length; i++){
            promises.push(getBase64(fileList[i]));
        }

        return Promise.all(promises)
    }
}

export default new ImageHelper();
