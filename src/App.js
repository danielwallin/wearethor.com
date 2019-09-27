import React from 'react';
import './App.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { data } from './Data/data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      amount: data.work.filter(i => i.type == 'work').length,
    };
  }

  componentDidMount() {
    const items = document.querySelectorAll('section.work');
    window.addEventListener(
      'scroll',
      () => {
        items.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < 0) {
            this.setState({ index: Number(el.getAttribute('id')) });
            console.log('setting state index to ', el.getAttribute('id'));
          }
        });
      },
      true,
    );
  }

  createMarkup(data) {
    return { __html: data };
  }

  renderSubtitle(subtitle) {
    return <div className='work-img-subtitle'>{subtitle}</div>;
  }

  getSlides() {
    let id = 0;
    return data.work.map(item => {
      console.log(item);
      id = item.type == 'work' ? (id += 1) : null;
      return (
        <section className={`section ${item.layout ? `layout layout-${item.layout}` : ''} ${item.type || 'other'}`} id={id} ref={item.type == 'work' && `work-${id}`}>
          {item.type == 'img' ? (
            <div className='work-img-wrapper work-img-full'>
              {item.headline ? (
                <React.Fragment>
                  <div className='section-headline'>
                    <h1>
                      we are{' '}
                      <span>
                        <span className='hide'>Thor</span>
                        <img src='img/thor.png' />
                      </span>
                    </h1>
                  </div>
                  <p className='section-subtext'>
                    A COLLECTION <br />
                    OF MURALS AND <br />
                    ART PIECES BY <br />
                    MR AND MRS THOR
                  </p>
                  <div className='work-img' style={{ backgroundImage: `url(/img/${item.file})` }} />
                </React.Fragment>
              ) : (
                <img src={`/img/${item.file}`} />
              )}
            </div>
          ) : (
            <React.Fragment>
              {item.type !== 'grid' && (
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
                                {link.icon && <img src={link.icon} />}
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
                  <div className='work-img-grid'>
                    {item.grid.map(path => {
                      return <div style={{ backgroundImage: `url(/img/${path})` }} />;
                    })}
                  </div>
                  {item.subtitle && this.renderSubtitle(item.subtitle)}
                </React.Fragment>
              )}
              {!item.grid && (
                <div className='work-img-wrapper'>
                  {item.file && <LazyLoadImage offset={300} style={{ width: `${item.imgsize}` }} src={`/img/${item.file}`} alt={item.title && item.title.replace(/"/g, '')} />}
                  {item.subtitle && this.renderSubtitle(item.subtitle)}
                </div>
              )}
            </React.Fragment>
          )}
        </section>
      );
    });
  }

  nextWork() {
    this.setState({ index: this.state.amount >= this.state.index + 1 ? this.state.index + 1 : this.state.index }, () => {
      console.log(this.state);
      this.refs[`work-${this.state.index}`].scrollIntoView({ behavior: 'smooth' });
    });
  }

  prevWork() {
    this.setState({ index: this.state.index > 1 ? this.state.index - 1 : this.state.index }, () => {
      console.log(this.state);
      this.refs[`work-${this.state.index}`].scrollIntoView({ behavior: 'smooth' });
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='navigation'>
          {this.state.amount}
          <button onClick={this.nextWork.bind(this)}>Next</button>
          <button onClick={this.prevWork.bind(this)}>Prev</button>
        </div>
        {this.getSlides()}
      </div>
    );
  }
}
