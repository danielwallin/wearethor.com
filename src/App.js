import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyLoad from 'react-lazyload';
import ProgressiveImage from './Components/Progressive';
import { data } from './Data/data';
import VisibilitySensor from 'react-visibility-sensor';
import { Waypoint } from 'react-waypoint';
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
    window.onblur = () => { document.title = `We miss you ❤️ | ${documentTitle}`; }
    window.onfocus = () => { document.title = documentTitle; }


    // const items = document.querySelectorAll('section.work');
    // window.addEventListener(
    //   'scroll',
    //   () => {
    //     items.forEach(el => {
    //       const rect = el.getBoundingClientRect();
    //       if (rect.top < 0) {
    //         this.setState({ index: Number(el.getAttribute('id')) });
    //         console.log('setting state index to ', el.getAttribute('id'));
    //       }
    //     });
    //   },
    //   true,
    // );
  }

  createMarkup(data) {
    return { __html: data };
  }

  renderSubtitle(subtitle) {
    return <div className='work-img-subtitle'>{subtitle}</div>;
  }

  onEnter (obj, isVisible) {
    console.log(obj, isVisible)
    const { workindex, isworkitem, hideNav } = obj
    if (isworkitem && isVisible) {
      this.setState({ index: workindex, hideNav: this.state.hideNav }, ()=> { console.log(this.state) })
    }
    if (isVisible) {
      this.setState({ index: this.state.index, hideNav: hideNav ? hideNav : false }, ()=> { console.log(this.state) })
    }
  }

  renderSections() {
    let workindex = 0;
    return data.work.map((item, index) => {
      let id;
      const isworkitem = item.type && item.type.indexOf('work') >= 0;
      if (isworkitem) {
        workindex += 1
        id = workindex
      } else {
        id = null
      }

      return (
        <Waypoint ref={isworkitem && `work-${workindex}`} onEnter={this.onEnter.bind(this, { workindex: workindex, isworkitem: isworkitem, hideNav: item.hideNav })}>
          <section 
            className={`section ${item.layout ? `layout layout-${item.layout}` : ''} ${item.type || 'other'}`} 
            id={id}>
            {/* // ref={isworkitem && `work-${workindex}`}> */}
            {item.type == 'img' ? (
              <div className='work-img-wrapper work-img-full'>
                {item.headline ? (
                  <React.Fragment>
                    <div className='section-headline'>
                      <h1>
                        we are <span>Thor</span>
                        {/* <span>
                          <span className='hide'>Thor</span>
                          <img src='img/thor.png' />
                        </span> */}
                      </h1>
                      <p className='section-subtext'>
                        A COLLECTION <br />
                        OF MURALS AND <br />
                        ART PIECES BY <br />
                        MR AND MRS THOR
                      </p>
                    </div>
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
                                  {link.icon && <LazyLoad offset={300}><img src={link.icon} /></LazyLoad>}
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
                    <LazyLoad offset={500}>
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
                    {item.img && 
                      <LazyLoad offset={10}>
                        <ProgressiveImage 
                          className={item.imgclass}
                          style={{ width: `${item.imgsize}`}}
                          alt={item.imgalt}
                          src={`/img/${item.img}`}
                          preview={`/img/${item.imgpreview}`}
                        />
                      </LazyLoad>
                    }
                    {item.subtitle && this.renderSubtitle(item.subtitle)}
                  </div>
                )}
              </React.Fragment>
            )}
          </section>
        </Waypoint>
      );
    });
  }

  nextWork() {
    this.setState({ index: this.state.amount >= this.state.index + 1 ? this.state.index + 1 : this.state.index }, () => {
      const el = document.getElementById(this.state.index)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' , block: 'start', inline: 'nearest'});
      }
    });
  }

  prevWork() {
    this.setState({ index: this.state.index > 1 ? this.state.index - 1 : this.state.index }, () => {
      const el = document.getElementById(this.state.index)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' , block: 'start', inline: 'nearest'});
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <div className={`navigation ${this.state.hideNav ? 'hide' : ''}`}>
          <button onClick={this.prevWork.bind(this)}>Previous work</button>
          <button onClick={this.nextWork.bind(this)}>Next work</button>
        </div>
        {this.renderSections()}
      </div>
    );
  }
}
