import React, { Component } from 'react';
import ErrorBoundary from './errorBoundary.jsx';
import Style from '../styles.less';

class SlideWrapper extends Component {

    constructor() {
      super();
  
      this.lastTime = 0;
      this.currentTime = 0;
      this.touchDown = false;
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
      // document.getElementById('wrapper').addEventListener("transitionend", () => , true);
      document.addEventListener('scroll', () => this.scrollHandler(), false);
      document.addEventListener('mousemove', event => this.mouseMoveHandler(event), false);
      document.addEventListener('mousedown', () => this.touchDown = true, false);
      document.addEventListener('mouseup', () => this.touchDown = false, false);
      document.addEventListener('touchstart', () => this.touchStartHandler(), false);
      document.addEventListener('touchmove', () => this.touchMoveHandler(event), false);
      document.addEventListener('touchcancel', () => this.touchCancelHandler(), false);
      document.addEventListener('touchend', () => this.touchEndHandler(), false);
    }

    mouseMoveHandler(event) {
     this.identifyMovement(event);
    }

    identifyMovement(event) {
      const { movementX, movementY, timeStamp } = event;
      this.currentTime = timeStamp;
      
      if(this.touchDown && this.currentTime > this.lastTime) {
        this.lastTime = this.currentTime + 500; // set extra time to make a delay
        if(movementX <= -1) this.movement = 'rigth';
        if(movementX >= 1) this.movement = 'left';
        if(movementY <= -1) this.movement = 'down';
        if(movementY >=  1) this.movement = 'up';
        this.moveSection();
      }
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
      let transitionData = {};
      if(this.movement === 'up') { // up
        if(this.currentSection === 0 || this.currentChildSection !== 0) return;
        this.currentSection -= 1;
        this.position.y += 100;
        this.setTransition(this.getSectionTransition());
      } else if(this.movement === 'down') { // down
        if(this.currentSection === this.props.children.length - 1 || this.props.children.length === undefined || this.currentChildSection !== 0) return;
        this.currentSection += 1; 
        this.position.y -= 100;
        this.setTransition(this.getSectionTransition());
      }  else {
        this.moveToChildrenSection();
      }

      this.moveWrapper(this.position.x, this.position.y);
    }
  
    moveToChildrenSection() {
      if(this.movement === 'left' && this.hasChildren(this.currentSection)) { // left
        if(this.currentChildSection === 0) {
          return;
        }
        this.currentChildSection -= 1;
        this.position.x += 100;
        this.setTransition(this.getChildSectionTransition());
      } else if(this.movement === 'rigth' && this.hasChildren(this.currentSection)) { // rigth
        if(this.currentChildSection >= this.getChildrenAmount(this.currentSection) - 1){
          return;
        } 
        this.currentChildSection += 1;
        this.position.x -= 100;
        this.setTransition(this.getChildSectionTransition());
      }
    }
  
    setTransition(transitionData = {}) {
      let { transitionType, transitionTime } = transitionData;
      let transitionFunction = '';
      switch(transitionType) {
        case 'ease':
          transitionFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
        break;
        case 'linear':
          transitionFunction = 'cubic-bezier(0.0, 0.0, 1.0, 1.0)';
        break;
        case 'ease-in':
          transitionFunction = 'cubic-bezier(0.42, 0, 1.0, 1.0)';
        break;
        case 'ease-out':
          transitionFunction = 'cubic-bezier(0, 0, 0.58, 1.0)';
        break;
        case 'ease-in-out':
          transitionFunction = 'cubic-bezier(0.42, 0, 0.58, 1.0)';
        break;
        default:
          transitionFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1.0)';
          transitionTime = 0.5;
        break;
      }
      document.getElementById('wrapper').style.transition = `transform ${transitionTime}s ${transitionFunction}`;
    }

    moveWrapper(x, y) {
      document.getElementById('wrapper').style.transform = `translate(${x}%,${y}%)`;
    }

    getChildSectionTransition() {
      let index = this.currentSection;
      let childIndex = this.currentChildSection;
      let section;
      if(this.props.children.length !== undefined) {
        if(this.props.children[index].props.children !== undefined) {
          section = this.props.children[index].props.children[childIndex].props;
        }
      } else {
        section = this.props.children.props.children[childIndex].props;
      }
      return section;
    }

    getSectionTransition() {
      let index = this.currentSection;
      let section;
      section = this.props.children[index].props;
      if(section.children !== undefined) {
        section = section.children[0].props;
      } 
      return section;
    }
  
    hasChildren(index) {
      let hasChildren = false;
        if(this.props.children.length !== undefined) {
          if (this.props.children[index].type.name === 'SectionContainer') {
            if (this.props.children[index].props.children.length !== undefined) {
              hasChildren = true;
            } else{
              hasChildren = false;
            }
          } else{
            hasChildren = false;
          }
        
        } 
      return hasChildren;
    }

    getChildrenAmount(index) {
      let childrenAmount = 0;
      if(this.props.children !== undefined) {
        if(this.props.children.length !== undefined) {
          if(this.props.children[index].props.children.length !== undefined) {
            childrenAmount = this.props.children[index].props.children.length;
          } else {
            childrenAmount = 1;
          }
        } else {
          childrenAmount = this.props.children.props.children.length;
        }
      } else{
        childrenAmount = 0;
      }
      return childrenAmount;
    }
  
    scrollHandler() { }
  
    render() {
      const { children } = this.props;
      return ( <div className={Style.wrapper} id="wrapper" ><ErrorBoundary>{ children }</ErrorBoundary></div> );
    }
  }
  
  export default SlideWrapper;