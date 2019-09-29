import React, { Component } from "react";
import './progressive.scss'

export default class ProgressiveImage extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoaded: false };
  }
  
  setLoaded() {
    setTimeout(()=>{
      this.setState({ isLoaded: true })
    }, 520)
  }

	render() {
		const { preview, src, style, className, alt } = this.props;
    const { isLoaded } = this.state;
    
		return (
      <div className={`progressive-wrapper ${className}`}>
        <div className={`progressive-preview ${isLoaded ? 'loaded' : 'isloading'}`}>
            <img alt={`${alt} preview`}
            style={style}
            src={preview} />
        </div>
        <div className="progressive-src">
          <img            
            onLoad={this.setLoaded.bind(this)}            
            {...isLoaded && { style: { opacity: 1, ...style }  }}
            src={src}
            alt={alt}
          />
        </div>  			
      </div>  			
		);
	}
}