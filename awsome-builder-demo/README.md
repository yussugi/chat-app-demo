# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts (for Amplify)

In the project directory, you can run:

### `amplify init`

Initialize amplify project.
1. Do you want to use an existing environment?\
"Yes"
1. Select the authentication method you want to use:\
"AWS profile"
1. Please choose the profile you want to use:\
e.g. "yussugi-amplify"

### `amplify publish`

Some next steps:\
`amplify status` will show you what you've added already and if it's locally configured or deployed\
`amplify add <category>` will allow you to add features like user login or a backend API\
`amplify push` will build all your local backend resources and provision it in the cloud\
`amplify console` to open the Amplify Console and view your project status\
`amplify publish` will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:\
Try `amplify add api` to create a backend API and then `amplify publish` to deploy everything

## Available Scripts (for React)

### `npm install`

### `npm run build`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
