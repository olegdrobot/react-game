import React, { Component } from 'react';
//import img from 'rs_school_js.svg'; 
import './footer.css';
//console.log(img);
class Footer extends React.Component {
	
	
	render(){
		return(
			<div className = "footer">
                <div className = "footer-label">
                    <div><a href="https://github.com/olegdrobot">Github</a></div>
                    <div>2021 Oleg</div>
                    <div><a href="https://rs.school/js/"><div className ="img"></div></a></div>
                    
                </div>
			</div>
		);
	}
}
export default Footer;