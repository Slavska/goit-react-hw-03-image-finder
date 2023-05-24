import css from './Searchbar.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearchHeart } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    input: '',
  };
  onChange = e => {
    this.setState({ input: e.currentTarget.value.toLowerCase() });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.setState({ input: '' });
  };
  render() {
    const { input } = this.state.input;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <BsSearchHeart className={css.SearchForm_button_icon} />
          </button>

          <input
            className={css.SearchForm_input}
            name="input"
            value={input}
            onChange={this.onChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
