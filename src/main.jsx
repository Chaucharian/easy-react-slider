import React from 'react';
import ReactDOM from 'react-dom';
import SlideWrapper from './components/slideWrapper.jsx';
import SectionContainer from './components/sectionContainer.jsx';
import Section from './components/section.jsx';
import Background from './model/imageSections';

const animationConfig = { transitionTime: 0.5, transitionType: 'linear', background: Background.default };
const animationConfig2 = { transitionTime: 1, transitionType: 'ease', background: Background.default };
const animationConfig3 = { transitionTime: 2, transitionType: 'ease', background: Background.default };

const Page = () => (
  <SlideWrapper>
      <Section {...animationConfig2} >
      <h1>
        Esa!
      </h1> 
      </Section>
      <Section {...animationConfig} /> 
      <Section>
      <h1>
        Esa!
      </h1>
     </Section>
     <SectionContainer>
      <Section {...animationConfig3} />
      <Section {...animationConfig3} > 
      <h1>
        Esa!
      </h1>
      </Section>
     </SectionContainer>
  </SlideWrapper>
);

ReactDOM.render(<Page />, document.getElementById('root'));