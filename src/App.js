import React from 'react';
import LazyLoad from 'react-lazyload';
import ProgressiveImage from './Components/Progressive';
import { data } from './Data/data';
import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      amount: data.work.filter(i => i.type && i.type.indexOf('work') >= 0).length,
    };
  }

  componentDidMount() {
    const documentTitle = document.title;
    window.onblur = () => {
      document.title = `we paint the world a happier place! | ${documentTitle}`;
    };
    window.onfocus = () => {
      document.title = documentTitle;
    };
  }

  createMarkup(data) {
    return { __html: data };
  }

  renderSubtitle(subtitle) {
    return <div className='work-img-subtitle'>{subtitle}</div>;
  }

  renderNavigation() {
    return (
      <div className={`navigation ${this.state.hideNav ? 'hide' : ''}`}>
        <button onClick={this.prevWork.bind(this)}>Previous work</button>
        <button onClick={this.nextWork.bind(this)}>Next work</button>
      </div>
    );
  }

  renderTop() {
    return (
      <div className='top'>
        <div className='contact'>
          <span
            className='contact-link'
            onClick={() => {
              const contact = document.getElementById('contact');
              if (contact) {
                contact.scrollIntoView();
              }
            }}
          >
            Contact
          </span>
        </div>
        <h1>
          we are{' '}
          <span>
            <img src='img/thor.png' alt='Thor logo' />
          </span>
        </h1>
        <p>
          A collection of Murals <br /> and art pieces by mr and mrs Thor
        </p>
      </div>
    );
  }

  renderSections() {
    let workindex = 0;
    return data.work.map((item, index) => {
      let id;
      const isworkitem = item.type && item.type.indexOf('work') >= 0;
      if (isworkitem) {
        workindex += 1;
        id = workindex;
      } else {
        id = null;
      }

      return (
        <section ref={isworkitem && `work-${workindex}`} className={`section ${item.layout ? `layout layout-${item.layout}` : ''} ${item.type || 'other'}`} id={id || item.id}>
          {item.type == 'img' ? (
            <div className='work-img-wrapper work-img-full'>
              {item.headline ? (
                <React.Fragment>
                  <div className='section-headline-img' style={{ backgroundImage: `url(/img/${item.img})` }} />
                </React.Fragment>
              ) : (
                <img src={`/img/${item.img}`} />
              )}
            </div>
          ) : (
            <React.Fragment>
              {item.type !== 'grid' && item.title && (
                <div className='work-wrapper'>
                  <div className='work-content'>
                    <h2 className='work-title' dangerouslySetInnerHTML={this.createMarkup(item.title)}></h2>
                    <div className='work-text' dangerouslySetInnerHTML={this.createMarkup(item.text)} />
                    {item.links && (
                      <div className='work-links'>
                        {item.links.map(link => {
                          return (
                            <div className='work-link'>
                              <a href={link.url} target='_blank'>
                                {link.icon && (
                                  <LazyLoad offset={300}>
                                    <img src={link.icon} />
                                  </LazyLoad>
                                )}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {item.grid && (
                <React.Fragment>
                  <LazyLoad offset={1000}>
                    <div className='work-img-grid'>
                      {item.grid.map(path => {
                        return <div style={{ backgroundImage: `url(/img/${path})` }} />;
                      })}
                    </div>
                    {item.subtitle && this.renderSubtitle(item.subtitle)}
                  </LazyLoad>
                </React.Fragment>
              )}
              {!item.grid && (
                <div className='work-img-wrapper'>
                  {item.imgtext && <div className='work-text mt-0' dangerouslySetInnerHTML={this.createMarkup(item.imgtext)} />}
                  {item.img && (
                    <LazyLoad offset={10}>
                      <ProgressiveImage
                        className={item.imgclass}
                        style={{ width: `${item.imgsize}` }}
                        alt={item.imgalt}
                        src={`/img/${item.img}`}
                        preview={`/img/${item.imgpreview}`}
                      />
                    </LazyLoad>
                  )}
                  {item.subtitle && this.renderSubtitle(item.subtitle)}
                </div>
              )}
            </React.Fragment>
          )}
        </section>
      );
    });
  }

  render() {
    return (
      <div className='App'>
        {this.renderTop()}
        {this.renderSections()}
      </div>
    );
  }
}
