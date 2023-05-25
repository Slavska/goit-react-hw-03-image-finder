import { Component } from 'react';
import css from './App.module.css';
import { fetch } from './../services/fetches';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { toast } from 'react-toastify';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      status: 'idle',
      items: [],
      totalHits: 0,
      page: 1,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.input !== prevState.input ||
      this.state.page !== prevState.page
    ) {
      this.fetchImg();
    }
  }
  fetchImg = async () => {
    const { input, page } = this.state;
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
          this.setState(prevState => ({
            items: [...prevState.items, ...hits],
            input,
            totalHits: totalHits,
            status: 'resolved',
          }));
        }
      } catch (error) {
        toast.error('Problem');
        this.setState({ status: 'rejected' });
      }
    }
  };
  onSubmit = input => {
    this.setState({ input: input, items: [] });
  };
  loadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { status, page, items, totalHits } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.loadMore} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
          toast.error('It is problem')
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.loadMore} />
          )}
        </div>
      );
    }
  }
}
