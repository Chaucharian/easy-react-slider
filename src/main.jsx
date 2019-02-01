import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';
import Background from './model/imageSections';

const animationConfig = { transitionTime: 0.5, transitionType: 'linear', background: Background.first };
const animationConfig2 = { transitionTime: 1, transitionType: 'ease', background: Background.first };
const animationConfig3 = { transitionTime: .8, transitionType: 'ease-out', background: Background.first };
const animationConfig4 = { transitionTime: 1, transitionType: 'ease-in-out', background: Background.first };

const Page = () => (
  <SlideWrapper>
      <Section {...animationConfig3}>
        <h1> Algo de texto por aca </h1>
        <b> y por aca </b>
      </Section>
      <Section {...animationConfig}>
        <h1> Algo de texto por aca </h1>
        <b> y por aca </b>
      </Section>
      <Section {...animationConfig2}>
        <h1> Algo de texto por aca </h1>
        <b> y por aca </b>
      </Section>
      <SectionContainer>
      <Section {...animationConfig4}>
        <h1> Algo de texto por aca </h1>
        <b> y por aca </b>
      </Section>
      <Section {...animationConfig3}>
        <h1> Algo de texto por aca </h1>
        <b> y por aca </b>
      </Section>
      </SectionContainer>
  </SlideWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));