import { useState, useEffect } from "react";
import { SpinnerDotted } from "spinners-react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import LoadMoreButton from "./components/Button-load-more";
import Modal from "./components/Modal";
import { Toaster } from "react-hot-toast";
import { APIfetchImg } from "./components/APIfetchImg";

function App() {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImages = () => {
      setIsLoading(true);

      return APIfetchImg({ query: searchQuery, page: currentPage })
        .then((data) => {
          setPictures((prevPictures) => [...prevPictures, ...data.hits]);
          setTotalHits(data.totalHits);

          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        })
        .catch((error) => setError(error))
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchImages();
  }, [searchQuery, currentPage]);

  const formSubmitHandler = (searchQuery) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setPictures([]);
    setError(null);
  };

  const toggleModal = (largeImg, tags) => {
    setShowModal(!showModal);
    setLargeImg(largeImg);
    setTags(tags);
  };

  const onLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {error && <p>{`Ooops... something went wrong: ${error}`} </p>}

      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery picturesList={pictures} openModal={toggleModal} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt={tags} />
        </Modal>
      )}

      {pictures.length !== totalHits && !isLoading && (
        <LoadMoreButton onClick={onLoadMoreClick} />
      )}

      {isLoading && (
        <SpinnerDotted
          size={80}
          color="rgb(130, 183, 231)"
          thickness={100}
          style={{
            display: "block",
            margin: "0 auto",
            marginTop: "16px",
          }}
        />
      )}

      <Toaster
        containerStyle={{
          top: 15,
          left: 1000,
          right: 0,
        }}
      />
    </>
  );
}

export default App;
