import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Style from './styles.less';

class PageWrapper extends Component {

  constructor() {
    super();

    this.initialScrollValue = 0;
    this.currentScrollValue = 0;
    this.movement = '';
    this.transitionRunning = false;
    this.position = { x: 0, y: 0 };
    this.currentSection = 0;
    this.currentChildSection = 0;
    this.currentKey = []; // left: 37, right: 39, up: 38, down: 40
    this.keyDownHandler = event => {
      this.currentKey[event.keyCode] = true;
      this.transitionRunning = true;
      this.keyHandler();
    }
    this.keyUpHandler = event => this.currentKey[event.keyCode] = false;   
  }
 
  componentDidMount() {
    document.addEventListener('keydown', event => this.keyDownHandler(event), false);
    document.addEventListener('keyup', event => this.keyUpHandler(event), false);
    document.getElementById('wrapper').addEventListener("transitionend", () => this.transitionRunning = false, true);
    document.addEventListener('scroll', () => this.scrollHandler(), false);
  }

  keyHandler() {
      if(this.currentKey[38]) { // up
        this.movement = 'up';
      } else if(this.currentKey[40]) { // down
        this.movement = 'down';
      } else if(this.currentKey[37]) { // left
        this.movement = 'left';
      } else if(this.currentKey[39]) { // rigth
        this.movement = 'rigth';
      }
      this.moveSection();
  }

  moveSection() {
    if(this.movement === 'up') { // up
      if(this.currentSection === 0) return;
      this.currentSection -= 1;
      this.position.y += 100;
      this.moveWrapper(this.position.x, this.position.y);
    } else if(this.movement === 'down') { // down
      if(this.currentSection === this.props.children.length - 1) return;
      this.currentSection += 1; 
      this.position.y -= 100;
      this.moveWrapper(this.position.x, this.position.y);
    }  else {
      this.moveToChildrenSection();
    }
  }

  moveToChildrenSection() {
    if(this.movement === 'left' && this.validateChildren()) { // left
      if(this.currentChildSection === 0) return;
      this.currentChildSection -= 1;
      this.position.x += 100;
      this.moveWrapper(this.position.x, this.position.y);
    } else if(this.movement === 'rigth' && this.validateChildren()) { // rigth
      if(this.currentChildSection >= this.props.children.length) return;
      this.currentChildSection += 1;
      this.position.x -= 100;
      this.moveWrapper(this.position.x, this.position.y);
    }
  }

  moveWrapper(x, y) {
    document.getElementById('wrapper').style.transform = `translate(${x}%,${y}%)`;
  }

  validateChildren() {
    return this.props.children[this.currentSection].props.children !== undefined;
  }

  scrollHandler() {
    // this.currentScrollValue = document.getElementsByTagName('body')[0].scrollTop;
    // console.log(this.currentScrollValue);
    // if(this.currentScrollValue >= this.initialScrollValue) {
    //   this.initialScrollValue = this.currentScrollValue + 50;
    //   this.currentKey[40] = true;
    //   this.moveSection();
    // } else {
    //   this.initialScrollValue = this.currentScrollValue - 50;
    //   this.currentKey[38] = true;
    //   this.moveSection();
    // }
  }

  render() {
    return ( <div className={Style.wrapper} id="wrapper" >{ this.props.children } </div> );
  }
}

PageWrapper.propTypes = {
  children: PropTypes.array
}

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

let sectionContainerId = 0;
class SectionContainer extends Component {
  constructor() {
    super();
    sectionContainerId += 1;
    this.state = { id: sectionContainerId };
  }

  componentDidMount() {
    if (this.props.children !== undefined) {
      document.getElementById(`section-container-${this.state.id}`).style.width = `${this.props.children.length * 100}%`;
    }
    console.log(this.props);

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


const Page = () => (
  <PageWrapper>
    <SectionContainer>
      <Section title="Section 1" >
        <h1>Eaaa guach</h1>
        <input type="text" />
      </Section>
      <Section title="Section sub 2" />
      <Section title="Section sub 3" />
    </SectionContainer>
    <Section title="Section 2" />
    <Section title="Section 3" />
    <Section title="Section 4" />
  </PageWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));