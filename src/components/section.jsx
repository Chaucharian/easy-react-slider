import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from '../styles.less';

let sectionId = 0;

class Section extends Component {
  constructor() {
    super();
    sectionId += 1;
    this.state = { id: 0, isChild: false };
  }

  componentWillMount() {
    this.title = this.props.title;
    this.setState(this.newState());
  }

  newState() {
    let newState = {};

    if (this._reactInternalFiber._debugOwner.stateNode !== null) {
        if (this._reactInternalFiber._debugOwner.stateNode.constructor.name === 'SectionContainer') {
            newState = { id: sectionId, isChild: true };
        }
    } else{
        newState = { id: sectionId, isChild: false };
    }
    return newState;
  }

  render() {
    let children = [];
    let childrenCount = 0;
    let isSectionContainer = false;

    // if(this.props.children !== 'undefined') {
    //   isSectionContainer = true;
    //   this.props.children.map( child => {
    //     childrenCount += 1;
    //     children.push(<Section key={childrenCount} title={child.props.title} />);
    //   })
    // }

    return ( <div className={ Style.section } id={ sectionId } ><h1>{this.title}</h1> ea </div> );
  }
}

Section.propTypes = {
  title: PropTypes.string,
}

export default Section;