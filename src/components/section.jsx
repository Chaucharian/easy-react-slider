import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from '../styles.less';
import Background from '../model/imageSections.js';

let sectionId = 0;

class Section extends Component {
  constructor() {
    super();
    sectionId += 1;
    this.state = { id: 0, background: '', transitionType: '', transitionTime: 0 };
  }

  componentWillMount() {
    this.setState(this.newState());
  }

  componentDidMount() {
    this.setBackground();
  }

  newState() {
    const { background, transitionType, transitionTime } = this.props;
    let newState = { 
      id: sectionId, 
      background: background === undefined ? Background.default : background, 
      transitionType: transitionType === undefined ? 'ease' : transitionType, 
      transitionTime: transitionTime === undefined ? 0.5 : transitionTime 
    };

    return newState;
  }

  setBackground() {
    const { id, background } = this.state;
    document.getElementById(`${id}`).style.background = `url(${background})`;
  }

  thowError() {
    throw (new Error('Section only accept html as content'));
  }

  render() {
    const { children } = this.props; 
    if (children.length !== undefined) {
      children.map( child => {
        if (child.type.name !== undefined) {
          this.thowError();
        }
      });
    } else {
      if (children.type.name !== undefined) {
        this.thowError();
      }
    }
    return ( <div className={ Style.section } id={ sectionId }><div className={Style.sectionContainer}>{ children }</div></div> );
  }
}

Section.propTypes = {
  background: PropTypes.string,
  transitionType: PropTypes.string,
  transitionTime: PropTypes.number
}

export default Section; 