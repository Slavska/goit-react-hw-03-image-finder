import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    onShow: false,
  };
  onClick = () => {
    this.setState(({ onShow }) => ({ onShow: !onShow }));
  };
  render() {
    const { item } = this.props;
    const { onShow } = this.state;
    const { webformatURL, tags } = item;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem_image}
          onClick={this.onClick}
          src={webformatURL}
          alt={tags}
        />
        {onShow && <Modal onClose={this.onClick} image={item} />}
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
