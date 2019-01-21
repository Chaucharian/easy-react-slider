import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from '../styles.less';
import backgroundImage from '../images/first.jpg';

let sectionId = 0;

class Section extends Component {
  constructor() {
    super();
    sectionId += 1;
    this.state = { id: 0, configuration: null };
  }

  componentWillMount() {
    this.title = this.props.title;
    this.setState({id: sectionId, background: this.props.background});
  }

  componentDidMount() {
    this.setBackground();
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

  setBackground() {
    const { id, background } = this.state;
    document.getElementById(`${id}`).style.background = `url(${backgroundImage})`;
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

    return ( <div className={ Style.section } id={ sectionId } ><h1>{this.title}</h1> { this.props.children } </div> );
  }
}

Section.propTypes = {
  configuration: PropTypes.object,
}

export default Section;