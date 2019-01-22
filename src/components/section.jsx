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
  //  console.log(this.newState());
    this.setState(this.newState());
  }

  componentDidMount() {
    this.setBackground();
  }

  newState() {
    let newState = { id: sectionId, background: Background.default, transitionType: 'ease', transitionTime: 0.5 };

    if(this.props.configuration !== undefined) {
      if(this.props.configuration.background !== undefined) {
        newState.background = this.props.configuration.background;
      } else if(this.props.configuration.transitionTime !== undefined) {
        newState.transitionTime = this.props.configuration.transitionTime;
      } else if(this.props.configuration.animationType !== undefined) {
        newState.transitionType = this.props.configuration.transtitionType;
      }
    }

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