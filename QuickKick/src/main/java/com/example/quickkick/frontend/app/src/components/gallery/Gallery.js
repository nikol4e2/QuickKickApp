import React, {useEffect, useState} from 'react';
import "./gallery.css"





const Gallery = () => {

    const [images, setImages] = useState([]);


    useEffect(() => {
        loadImages();
    },[] );

    const loadImages = () => {
        let imageArray = [];
        for(let i = 1; i <= 43; i++) {
            imageArray.push(`${i}.jpg`);
        }
        setImages(imageArray);

    }
    return (
        <div className="gallery-wrapper">
            <h2 className="gallery-title">Галерија</h2>
            <div className="gallery-grid">
                {images.map((img, index) => (
                    <div key={index} className="gallery-item">
                        <img
                            src={`/gallery/${img}`}
                            alt={`Gallery ${index + 1}`}
                            className="gallery-img"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
