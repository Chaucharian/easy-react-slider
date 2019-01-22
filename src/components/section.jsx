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
    const { background, transitionType, transitionTime, id } = this.props;
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

  render() {
    return ( <div className={ Style.section } id={ sectionId }> Section{sectionId} </div> );
  }
}

Section.propTypes = {
  configuration: PropTypes.object
}

export default Section;