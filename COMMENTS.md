# Comments and Project Decisions

### The project
The project is a basic client for NBA stats, including team and players data. 

### Technologies in use
- React (CRA): it provides an initial setup for React projects, so it's a good way to start and move fast.

- Styled-components: used for styling purposes. CSS-in-JS seems the best styling approach for me and I am very confidente with this technology.

- Apollo: makes the connection between client and graphql server. Used for studying purpose, since I'd never used Apollo before.

- TypeScript: used to improve types and prevent typos/bugs in the code. It allows you to know if it's all okay with tour code in compiling time.

- Jest: used for simples UI tests. Jest it's really simple and its config can be used by a lot of other test technologies. It also came by default with CRA.

### Comments
This application is running under the newest version of React (16.8), so hooks is already available. All components were written using as less class methods as possible, cause it makes your code shorter and more readable, in my opinion. 
I combined context API and Hooks to build a simple global state management. I did not use Redux (or other state manager) because these global states are very simple and because I wanted to try Context API + Hooks.
I created a HOC (src/hocs/createQueryRenderer.tsx) to encapsulate the components and serve them with needed data. It makes the component code cleaner and centralize the logic to make queries.
This application is being hosted by heroku. Heroku allows me to deploy directly from my branch master on GitHub, so I can easily deploy new versions of the app. It's also free.