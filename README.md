This project demonstrates search using the [Google Books API](https://developers.google.com/books/docs/overview). The project has been written in pure HTML, CSS and JavaScript and does not use libraries such as jQuery. A demo of the project may be viewed at:
[https://vikeshcodes.com/gbooks](https://vikeshcodes.com/gbooks)

**Note: Test cases for this project have been implemented in the `./tests` directory. The test page (`search.spec.html`) uses the library [Jasmine](https://jasmine.github.io/). This library is not used elsewhere in this project.**

## Dependencies

The project can be run on any server. It can even run locally from your machine by loading `index.html` into your browser. Internally, however, the project makes use of 2 external libraries (referenced via CDN) for certain UI Elements:
- [Google Fonts: Roboto](https://fonts.google.com/?query=roboto&selection.family=Roboto)
- [Font Awesome](https://fontawesome.com/v4.7.0/get-started/)

Additionally, this project uses the following library to implement test cases:
- [Jasmine](https://jasmine.github.io/)

Nothing needs to be installed for this project to work. However, the above files will not load without an active internet connection.

## Files

The project has 2 pages:
- The Home Page
- The Search Results Page

Each of these pages is detailed below.

### `index.html`

This page takes a search query and formats it into a URL parameter for the Search Results Page. It makes use of 4 files in the project:
- `./styles/common.css`: Holds styles for the font, buttons, sizes, colours and more. It makes use of CSS variables for easy customization
- `./styles/home.css`: Holds styles particular to the Home Page (the search box, in particular)
- `./js/common.js`: Contains functions to run when the page is loaded and make HTTP Requests
- `./js/home.js`: Formats the query, changes the page and adds listeners for searching

### `search.html`

This page makes a request to the [Google Books API](https://developers.google.com/books/docs/overview) and renders the result. Changing the query is equivalent to a new page load, so the user can return to previous queries by using the browser back button. A 'back button' has been implemented in the header to take the user back to the Home Page.

This page makes use of 4 files in the project:
- `./styles/common.css`: Holds styles for the font, buttons, sizes, colours and more. It makes use of CSS variables for easy customization
- `./styles/searchpage.css`: Holds styles for elements used on this page that are unlikely to be used on additional pages, should the project size grow larger. These styles do not clash with `common.css` and their CSS may be merged into a single file
- `./js/common.js`: Contains functions to run when the page is loaded and make HTTP Requests
- `./js/searchpage.js`: Adds listeners, makes the API request, renders results

## Using the API

The URL structure of the API used in this application is:
`https://www.googleapis.com/books/v1/volumes?country=US&startIndex=0&maxResults=20&q=search+terms`

This end-point does not require an API key or OAUTH 2.0 token. The URL parameters passed are explained below:
- `country`: Optional. Takes the country of the request. Used to ensure the API does not return a status of `403`
- `startIndex`: Optional. Used to load more results
- `maxResults`: Optional. Used to load 20 results at a time. If not mentioned, the API returns only 10 results. The maximum value that can be passed here is 40
- `q`: Required. Takes the search query, separated by `+`

**Note: The API may be used by passing `q=search+terms` as the only URL parameter**

## Testing This Project

The project may be tested by loading the `./tests/search.spec.html` page. The test cases on this page are written in `./tests/searchpage.spec.js`. Note that in order for all the tests to pass, a query must be passed in the URL of the page. The simplest way to achieve this would be to load `index.html`, enter a search query and click 'Run Unit Tests'.

Here is a sample of the test cases run when passing the query `Jasmine Javascript`:
[https://vikeshcodes.com/gbooks/tests/search.spec.html?query=Jasmine+Javascript](https://vikeshcodes.com/gbooks/tests/search.spec.html?query=Jasmine+Javascript)

The tests that have been written broadly cover 3 areas:
- Fetching the search query from the URL and setting it to the search box
- Hitting the API with this query and testing the response
- Using this response to create search results in the DOM

Each test case depends on the previous test case running successfully. If one test case fails, all subsequent tests fail too. Owing to this, the test cases **will not work if the tests are randomized**.

## Additional Details

For additional details, feel free to shoot an E-Mail to vikesh@beyondthebyte.com. I'd be glad to help in any way I can.<br>
Please bear in mind that I'm working on several projects at any given time, so I might take a few days to write back to you.

You may visit [my portfolio](https://vikeshcodes.com/) to learn more about me and my work.<br>
If you're hesitant about coding, remember: Coding is more of an art than a science. The goal is the plot, the variables are the characters and you are God, writing their story. Break the code if you have to in order to understand why it was there in the first place. Everyone, even Gods, start somewhere.