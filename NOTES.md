This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Rules

I have three types of components,

- Element
- Feature
- Route

- - Element components are pure dummy components they just render what they are given, not aware of any mutations or routing

- - Feauture components are responsible for all data mutations and calling APIs, they are not aware of any routing

- - Route components are responsible for controlling navigation across various pages and also aggregating `Feature` and `Element` components

- - Do not pass more than six props to a component
