import React from 'react';

class FileDownload extends React.Component{
    constructor(props){
        super(props);

        this.downloadClick = React.createRef();
        this.clickD = this.clickD.bind(this)
    }

    componentDidMount() {
        this.clickD()
    };

    clickD(){
        this.downloadClick.current.click();
    };

    render()
    {
        return (
            <a href="apk/client.apk" ref={this.downloadClick} download="client.apk">
            </a>
        );
    }
}

export default FileDownload;


