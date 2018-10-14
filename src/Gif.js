import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class Gif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { gif } = this.props,
              { open } = this.state,
              width = window.innerWidth - 65 > gif.images.original.width ? gif.images.original.width : window.innerWidth - 65,
              style = { width };
        console.log(width);
        return (
            <div className="gif">
                <img src={gif.images.original.url} 
                     alt="gif failed to load" 
                     className="gif-img" 
                     onClick={this.openModal}>
                </img>
                <Modal open={open} onClose={this.closeModal} center>
                    <div className="gif-title">{gif.title}</div>
                    <img src={gif.images.original.url} 
                         alt="gif failed to load" 
                         style={style}>
                    </img>
                    <div className="gif-url">
                        <a href={gif.bitly_url}>{gif.bitly_url}</a>
                    </div>
                </Modal>
            </div>
        )
    }
}