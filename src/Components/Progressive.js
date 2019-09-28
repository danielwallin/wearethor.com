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
    }, 300)
  }

	render() {
		const { preview, src, style, className } = this.props;
    const { isLoaded } = this.state;
    console.log(style)
    
		return (
      <div className={`progressive-wrapper ${className}`}>
        <div className={`progressive-preview ${isLoaded ? 'loaded' : 'isloading'}`}>
          <img
            style={style}
            onLoad={this.setLoaded.bind(this)}            
            src={preview}
          />
        </div>
        <div className="progressive-src">
          <img            
            {...isLoaded && { style: { opacity: 1, ...style }  }}
            src={src}
          />
        </div>  			
      </div>  			
		);
	}
}