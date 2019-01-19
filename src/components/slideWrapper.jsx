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
      document.getElementById('wrapper').addEventListener("transitionend", () => console.log("end"), true);
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
      const { movementX, movementY } = event;
      this.currentTime = event.timeStamp;
      
      if(this.touchDown && this.currentTime > this.lastTime) {
        this.lastTime = this.currentTime + 500; // set extra time to make a delay
        if(movementX <= -5) this.movement = 'rigth';
        if(movementX >= 5) this.movement = 'left';
        if(movementY <= -5) this.movement = 'down';
        if(movementY >=  5) this.movement = 'up';
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
      console.log(this.movement);
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
  
  SlideWrapper.propTypes = {
    children: PropTypes.array
  }
  
  export default SlideWrapper;