import React from 'react';
import './App.scss';
import { Fullpage, Slide, HorizontalSlider } from 'fullpage-react';
import { data } from './Data/data';

const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 10 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 2 is default
  touchSensitivity: 2,
  scrollSpeed: 300,
  hideScrollBars: true,
  enableArrowKeys: true,
};

const horizontalSliderProps = {
  name: 'horizontalSlider1', // name is required
  infinite: true, // enable infinite scrolling
};

const horizontalSlides = [<Slide> Slide 2.1 </Slide>, <Slide> Slide 2.2 </Slide>];
horizontalSliderProps.slides = horizontalSlides;

const createMarkup = data => {
  return { __html: data };
};

const renderLinks = links => {
  return (
    <div className="page-links">
      {links.map(link => {
        return (
          <a className="page-link" href={`${link.url}`} target="_blank">
            <ion-icon name={`${link.icon}`}></ion-icon>
          </a>
        );
      })}
    </div>
  );
};

const slides = data.pages.map(item => {
  if (item.type == 'img') {
    return (
      <Slide>
        <div className="page-img-wrapper">
          <div className="page-img" style={{ backgroundImage: `url(/img/${item.file}.png)` }} />
        </div>
      </Slide>
    );
  } else {
    return (
      <Slide>
        <div className="page">
          <div className="page-content">
            <h2 className="page-title">{item.title}</h2>
            <div className="page-text" dangerouslySetInnerHTML={createMarkup(item.text)} />
            {item.links && renderLinks(item.links)}
          </div>
        </div>
      </Slide>
    );
  }
});

// const slides = [
//   // <HorizontalSlider {...horizontalSliderProps}></HorizontalSlider>,
// ];
fullPageOptions.slides = slides;

function App() {
  return (
    <div className="App">
      <Fullpage {...fullPageOptions} />
    </div>
  );
}

export default App;
