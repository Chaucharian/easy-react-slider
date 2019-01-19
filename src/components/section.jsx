import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from '../styles.less';

let sectionIds = 0;

class Section extends Component {
  constructor() {
    super();
    this.state = { id: 0 };
    sectionIds += 1;
  }

  componentWillMount() {
    this.title = this.props.title;
  }

  componentDidMount() {
    console.log(this.props);
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

    return ( <div className={Style.section} id={sectionIds} ><h1>{this.title}</h1> { this.props.children } </div> );
  }
}

Section.propTypes = {
  title: PropTypes.string,
}

export default Section;