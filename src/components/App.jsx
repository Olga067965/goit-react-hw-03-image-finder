import React, { Component } from 'react';
import Searchbar from './Searchbar'; 
import ImageGallery from './ImageGallery'; 
import Button from './Button'; 
import Loader from './Loader'; 
import Modal from './Modal'; 

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    apiKey: '38684202-1b965ae9aa77d23174a7bb28f',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, currentPage, apiKey } = this.state;
    const baseUrl = 'https://pixabay.com/api/';
    const perPage = 12;

    this.setState({ isLoading: true });

    fetch(
      `${baseUrl}?q=${searchQuery}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...data.hits],
          currentPage: prevState.currentPage + 1,
        }))
      )
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, images: [] });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}

export default App;
