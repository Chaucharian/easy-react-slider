import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';

const animationConfig = { time: 0.5, type: 'linear', background: './images/first.jpg' };
const animationConfig2 = { time: 0.5, type: 'ease' };
const animationConfig3 = { time: 0.5, type: 'ease-in-out' };
const animationConfig4 = { time: 0.5, type: 'ease-in' };
const animationConfi5 = { time: 0.5, type: 'ease-out' };

const Page = () => (
  <SlideWrapper>
    <SectionContainer>
      <Section  title="Section " background={animationConfig.background}>
        <h1>Eaaa guach</h1>
        <input type="text" />
      </Section>
      <Section title="Section sub 2" />
      <Section title="Section sub 3" />
    </SectionContainer>
    <Section title="Section 2" />
    <Section title="Section 3" />
    <SectionContainer>
      <Section  title="Section " background={animationConfig.background}>
        <h1>Eaaa guach</h1>
        <input type="text" />
      </Section>
      <Section title="Section sub 2" />
      <Section title="Section sub 3" />
    </SectionContainer>
    <Section title="Section 4" />
    <Section title="Section EL JUAM RE GATP!" />
  </SlideWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));