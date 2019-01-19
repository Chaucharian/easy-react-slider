import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';

const Page = () => (
  <SlideWrapper>
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
  </SlideWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));