import './styles.css';
import img from './assets/OD-image.png';
import comment from './assets/comment.png';
import heartEmpty from './assets/heart.png'

const logo = document.getElementById('logo1');
logo.src = img;

const artContainer = document.getElementById('art-container');
const artContent = document.createElement('div');

let images = [];

const baseUrl = 'https://api.artic.edu/api/v1/artworks?limit=15';
const getImages = async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  images = data.data;
  images = images.map((image) => ({
    id: image.id,
    image_id: image.image_id,
    title: image.title,
    date: image.date_start,
    artist: image.artist_title,
  })).filter((image) => image.image_id !== null && image.artist !== null);

  const imageString = images.map((img) => `
  <article class="article-style">
   <img class="image-style" src="https://www.artic.edu/iiif/2/${img.image_id}/full/843,/0/default.jpg"
       alt="image of artwork">
     <h2 class="title">${img.title},
       ${img.date}</h2>
     <h3 class="artist">${img.artist}</h3>
    
     <figure class="caption-container">
       <figcaption class="caption-content">
         <img class="like" id="${img.id}" src="${heartEmpty}" alt="like icon">&nbsp;
           <span class="like-count">
          
           </span>
           <img class="comment" id="${img.id}" src="${comment}" alt="comment icon">&nbsp;<span class="comment-count">Comments</span>
           </figcaption>
         </figure>
       </article>`).join('');
  artContainer.innerHTML = imageString;
  artContainer.appendChild(artContent);
};

window.onload = () => {
  getImages();
  // updateLikes();
};
