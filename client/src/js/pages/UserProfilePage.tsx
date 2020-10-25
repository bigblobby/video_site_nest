import React from 'react';
import ImageService from "../services/ImageService";
import ApiService from "../services/ApiService";

type UserProfilePageState = {
    file: any
}

class UserProfilePage extends React.Component<{}, UserProfilePageState> {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        }
    }


    handleFile = async (e) => {
        const files = e.target.files;
        const image = await ImageService.fileListBase64(files);

        this.setState({
            file: image[0]
        });
    }

    handleUpload = () => {
        const formData = new FormData();
        formData.append('avatar', this.state.file.uploadImage);

        ApiService.uploadAvatar(formData)
            .then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleFile}/>
                <button onClick={this.handleUpload}>Upload</button>
            </div>
        );
    }
}

export default UserProfilePage;
