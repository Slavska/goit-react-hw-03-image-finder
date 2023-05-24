import { Component } from 'react';
import css from './App.module.css';
import { fetch } from './../services/fetches';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { toast } from 'react-toastify';

let page = 1;
export class App extends Component {
  constructor() {
    super();
    this.state = {
      status: 'idle',
      items: [],
      totalHits: 0,
    };
  }
  fetchImg = async input => {
    page = 1;
    if (input.trim() === '') {
      toast.warning('Empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetch(input, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          toast.warning(
            `Sorry, there are no images ${input}. Please try again.`
          );
        } else {
          toast.success(`Yes! We find ${input}.`);
          this.setState({
            items: hits,
            input,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        toast.error('Problem');
        this.setState({ status: 'rejected' });
      }
    }
  };
  loadMore = async () => {
    this.setState({ status: 'pending' });
    try {
      const { hits } = await fetch(this.state.input, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      toast.error('Something went wrong!');
      this.setState({ status: 'rejected' });
    }
  };
  render() {
    const { status, page, items, totalHits } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.fetchImg} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.fetchImg} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.loadMore} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.fetchImg} />
          toast.error('It is problem')
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.fetchImg} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.loadMore} />
          )}
        </div>
      );
    }
  }
}
