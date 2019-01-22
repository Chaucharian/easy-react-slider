import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';
import Background from './model/imageSections';

const animationConfig = { time: 0.5, type: 'linear', background: Background.first };

const Page = () => (
  <SlideWrapper>
    <SectionContainer>
      <Section {...animationConfig}>
      <h1> Algo de texto por aca </h1>
      <b> y por aca </b>
      </Section>
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