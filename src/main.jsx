import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';
import Background from './model/imageSections';

const animationConfig = { time: 0.5, type: 'linear', background: Background.two };
const animationConfig2 = { time: 0.5, type: 'ease' };
const animationConfig3 = { time: 0.5, type: 'ease-in-out' };
const animationConfig4 = { time: 0.5, type: 'ease-in' };
const animationConfi5 = { time: 0.5, type: 'ease-out' };

let sectioN = () => {
  return <div><h1>EA!</h1></div>
}

const Page = () => (
  <SlideWrapper>
    <SectionContainer>
      <Section {...animationConfig} />
      <Section />
      <Section />
      <Section />
    </SectionContainer>
    <Section />
      <Section />
      <Section />
      <Section />
  </SlideWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));