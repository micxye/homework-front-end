import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import ReactDOM from 'react-dom';

export default class Gif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            favorite: props.favorite,
        }
    }

    componentDidMount() {
        const gif = ReactDOM.findDOMNode(this);
        gif.addEventListener('mouseenter', this.handleMouseEnter);
        gif.addEventListener('mouseleave', this.handleMouseLeave);
    }

    
    /* Element event handlers */

    handleMouseEnter = (e) => {
        e.srcElement.classList.add('hover');
        e.srcElement.querySelector('.favorite').classList.add('show');
    }

    handleMouseLeave = (e) => {
        e.srcElement.classList.remove('hover');
        e.srcElement.querySelector('.favorite').classList.remove('show');
    }

    handleFavoriteClick = () => {
        const { gif, addFavorite, removeFavorite } = this.props;

        if (this.state.favorite) {
            this.setState({ favorite: false });
            removeFavorite(gif);
        } else {
            this.setState({ favorite: true });
            addFavorite(gif);
        }
    }


    /* Modal handlers */

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { gif } = this.props,
              { open, favorite } = this.state,
              width = window.innerWidth - 65 > gif.images.original.width ? gif.images.original.width : window.innerWidth - 65,
              style = { width };

        return (
            <div className="gif">
                <img src={gif.images.downsized_medium.url} 
                     alt="gif failed to load" 
                     className="gif-img" 
                     onClick={this.openModal}>
                </img>
                <div className={(() => favorite ? 'favorite favorited show' : 'favorite')()} onClick={this.handleFavoriteClick}>♥</div>
                <Modal open={open} onClose={this.closeModal} center>
                    <div className="gif-title">{gif.title}</div>
                    <img src={gif.images.original.url} 
                         alt="gif failed to load" 
                         style={style}>
                    </img>
                    <div className="gif-url">
                        <div className={(() => favorite ? 'favorite-modal favorited' : 'favorite-modal')()} onClick={this.handleFavoriteClick}>♥</div>
                        <a href={gif.bitly_url}>{gif.bitly_url}</a>
                    </div>
                </Modal>
            </div>
        )
    }
}