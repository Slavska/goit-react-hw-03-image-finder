import { Component } from 'react';
import css from './Modal.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#modal');
export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }
  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  onKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.image;
    return ReactDOM.createPortal(
      <div className={css.Overlay} onClick={this.onBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      ModalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};
