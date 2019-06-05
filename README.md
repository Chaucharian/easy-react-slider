<h1>Easy React Slider</h1>
With this handfull library you can make web sites like a presentation without effort. 

<h2>Installation</h2>
Run <b>yarn</b> then run <b>yarn start</b>

## Basic Usage
```js
    const customConfiguration1 = { transitionTime: 0.5, transitionType: 'linear', background: Background.first };
    const customConfiguration2 = { transitionTime: 1, transitionType: 'ease', background: Background.first };

    const Page = () => (
        <SlideWrapper>
            <SectionContainer>
                <Section {...customConfiguration1} />
                <Section {...customConfiguration2}> 
                    <h1>Skkrr!</h1>
                    <p>whatever html you like to include</p>
                </Section>
            </SectionContainer>
            <Section />
        </SlideWrapper>
    );

    ReactDOM.render(<Page />, document.getElementById('root'));
```

## SlideWrapper
   It's the whole page container, it receives SectionContainer or Section as children

## SectionContainer
   Only receive Section as children making a slide effect to the right

## Section
   This component is where you put your html. it also receive a configuration object if you want to change its behavior.
```js
    const customConfiguration1 = { transitionTime: 0.5, transitionType: 'linear', background: Background.first };
```
   You can specify time,type and background to your section
   and that's all... easy right ?
