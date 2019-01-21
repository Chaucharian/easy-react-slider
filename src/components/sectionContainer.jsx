import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './section.jsx';
import Style from '../styles.less';

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

  render() {
    let children = [];
    let childrenCount = 0;
    this.props.children.map( child => {
      childrenCount += 1;
      children.push(<Section key={childrenCount} title={child.props.title} />);
    })

    return ( <div className={Style.sectionContainer} id={`section-container-${sectionContainerId}`} > { children } </div> );
  }
}

export default SectionContainer;