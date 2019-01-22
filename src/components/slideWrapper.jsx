import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        console.log(" section: "+this.currentSection+" child: ",this.currentChildSection);
    }
  
    moveSection() {
      if(this.movement === 'up') { // up
        if(this.currentSection === 0 || this.currentChildSection !== 0) return;
        this.currentSection -= 1;
        this.position.y += 100;
        this.moveWrapper(this.position.x, this.position.y);
      } else if(this.movement === 'down') { // down
        if(this.currentSection === this.props.children.length - 1 || this.props.children.length === undefined || this.currentChildSection !== 0) return;
        this.currentSection += 1; 
        this.position.y -= 100;
        this.moveWrapper(this.position.x, this.position.y);
      }  else {
        this.moveToChildrenSection();
      }
      console.log(this.getSectionTransition(this.currentSection));
    }
  
    moveToChildrenSection() {
      if(this.movement === 'left' && this.hasChildren(this.currentSection)) { // left
        if(this.currentChildSection === 0) {
          return;
        }
        this.currentChildSection -= 1;
        this.position.x += 100;
        this.moveWrapper(this.position.x, this.position.y);
      } else if(this.movement === 'rigth' && this.hasChildren(this.currentSection)) { // rigth
        if(this.currentChildSection >= this.getChildrenAmount(this.currentSection) - 1){
          return;
        } 
        this.currentChildSection += 1;
        this.position.x -= 100;
        this.moveWrapper(this.position.x, this.position.y);
      }
    }
  
    moveWrapper(x, y) {
      document.getElementById('wrapper').style.transform = `translate(${x}%,${y}%)`;
    }

    getChildSectionTransition(index, indexChild) {
      let section;
      section = this.props.children[index].props.children[indexChild];
      return section;
    }

    getSectionTransition(index) {
      let section;
      section = this.props.children[index];
      return section;
    }
  
    hasChildren(index) {
      let hasChildren = false;
      if(this.props.children !== undefined) {
        if(this.props.children.length !== undefined) {
          hasChildren = this.props.children[index].props.children !== undefined;
        } else {
          hasChildren = this.props.children.props.children !== undefined;
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
        }
      } else{
        childrenAmount = 0;
      }
      return childrenAmount;
    }
  
    scrollHandler() { }
  
    render() {
      const { children } = this.props;
      return ( <div className={Style.wrapper} id="wrapper" >{ children } </div> );
    }
  }
  
  export default SlideWrapper;