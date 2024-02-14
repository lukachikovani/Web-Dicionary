## Dictionary Web Application

### The challenge
For this project, we utilize the dictionaryapi.dev API to retrieve word definitions and display them. The API provides a straightforward way to make API calls, although the response format can be challenging due to the freeform nature of wikitext. As a result, inconsistencies may arise in the JSON structure depending on the specific word being queried. One example is the placement of audio file references, which may vary within the pronunciation slots.

The project incorporates a day/night color scheme switching feature to enhance the user experience. To play word pronunciations, an <audio> element is employed, supporting various audio formats such as mp3 and ogg. The custom button included ensures that the audio element is controlled solely through the API, with its controls hidden from view.

The web page created for this project prioritizes accessibility, enabling full keyboard navigation for users. 

Live on Netlify: [Link](https://dictionary-web-appc.netlify.app/)

### Users are be able to:

- Search for words using the input field
- See the Free Dictionary API's response for the searched word
- Play the audio file for a word when it's available
- Switch between serif, sans serif, and monospace fonts
- Switch between light and dark themes
- View the optimal layout for the interface depending on their device's screen size

### Screenshots

![App Screenshot](https://iili.io/HhF9dn2.webp)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Media Queries
- Javascript ES6
- DOM Manipulation
- Fetch API


### Frontend Mentor - Dictionary Web App

This is a solution to the Dictionary Web App challenge on [Frontend Mentor](https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL).

