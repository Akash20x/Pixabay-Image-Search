import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import Modal from './components/Modal';

import Spinner from './components/Spinner.gif';


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [selectedImg, setSelectedImg] = useState(null);

  const countimages = 100;

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=25498619-147f47fea6f4aa08f6c22f598&q=${term}&per_page=${countimages}&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className='container mx-auto'>
      <h1 className='text-7xl font-bold text-center text-purple-500 mt-2 md:mt-5'>
        PixaBay
      </h1>
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className='text-6xl text-center mx-auto mt-32'>No Image Found</h1>
      )}

      {isLoading ? (
        <img src={Spinner} alt='Loading...' className='text-center mx-auto' />
      ) : (
        <div className='grid justify-evenly grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              setSelectedImg={setSelectedImg}
            />
          ))}
        </div>
      )}
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
