import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';
import Background from './model/imageSections';

const animationConfig = { transitionTime: 0.5, transitionType: 'linear', background: Background.first };
const animationConfig2 = { transitionTime: 1, transitionType: 'ease', background: Background.first };
const animationConfig3 = { transitionTime: 0.2, transitionType: 'ease-in', background: Background.first };
const animationConfig4 = { transitionTime: 0.5, transitionType: 'ease-in-out', background: Background.first };

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
    <SectionContainer>
      <Section {...animationConfig3}>
      <h1> AlgoEEEEEEEE </h1>
      <b> y por aca </b>
      </Section>
      <Section />
      <Section />
      <Section />
    </SectionContainer>
    <Section  {...animationConfig4} />
    <Section {...animationConfig2} />
  </SlideWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));