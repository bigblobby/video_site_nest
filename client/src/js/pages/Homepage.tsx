import React from 'react';
import axios from 'axios';

class Homepage extends React.Component {

    getTest = () => {
        axios.get('/api')
            .then(result => {
                console.log(result);
            })
    }

    render() {
        return (
            <div>
                <button onClick={this.getTest}>Get</button>
            </div>
        );
    }
}

export default Homepage;
