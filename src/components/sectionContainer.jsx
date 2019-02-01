import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './section.jsx';
import Style from '../styles.less';
import { underline } from 'ansi-colors';

let sectionContainerId = 0;

class SectionContainer extends Component {
  constructor() {
    super();

    sectionContainerId += 1;
    this.state = { id: sectionContainerId };
  }

  componentDidMount() {
    if (this.props.children !== undefined) {
      this.childrenCount = this.props.children.length;
      document.getElementById(`section-container-${this.state.id}`).style.width = `${ this.childrenCount * 100 }%`;
    }
  }

  thowError(message = 'SectionContainer only accept Sections as content') {
    throw (new Error(message));
  }

  render() {
    const { children } = this.props;

    if (children !== undefined) {
      if (children.length !== undefined) {
        children.map( child => {
          if (child.type.name === undefined && child.type.name !== 'Section') {
            this.thowError();
          }
        });
      } else {
        if (children.type.name === undefined && children.type.name !== 'Section') {
          this.thowError();
        }
      } 
    } else {
      this.thowError('SectionContainer its only a container, you need to put a Section like child at least');
    }
    return ( <div className={Style.sectionContainer} id={`section-container-${sectionContainerId}`} >{ children }</div> );
  }
}

export default SectionContainer;