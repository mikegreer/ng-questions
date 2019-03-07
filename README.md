## NG-Questions

A front-end modular data capture engine for market tests. 

This can be used for running live tests, better shared understanding with the development team, and to prototype potential data structures.

Over time, this should grow into a highly reusable test suite to allow quote funnel prototypes to be created and tested quickly with live or near-live data.

## Getting set up
In the project directory, run

### `yarn`

to install dependencies, then run

### `yarn start`

to start the development server and interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Data structure

### Questions

The app has been built to allow questions to be changed quickly. It currently loads in a JSON question file '/public/questionData/questions.json' - an object with keys for each question (see components below for each data structure).

Questions are ordered by their 'displayOrder' property.

### Answers

Answers are stored in the state of the top level Questions component. There is a single answers object with keys matching the question keys.

# Components

## Multipicker

`/components/MultiPicker.js`

Displays a card for each option provided. Users can select / deselect multiple cards before clicking the button to save their answers and advance to the next question.

### Multipicker usage

```javascript
<MultiPicker 
    data = {this.props.data} //data object for single question to render
    handleAnswer = {(answerData) => this.handleAnswer(answerData)} //pass the function to call when the button is clicked
    currentAnswer = {this.props.answer} //pass current answer object (used to set state of the component when rendered)
/>
```

Images referenced in the options object are stored in '/public/images/icons/' 

Multipicker questions look like this:

```JSON
"questionKey": {
    "displayOrder": 1,
    "type": "multipicker",
    "headline": "Headline text",
    "subhead": "Select all that apply.",
    "options": [
        {
            "label": "Pool",
            "image": "pool.svg",
            "value": "pool"
        },
        {
            "label": "Above ground pool",
            "image": "above-ground-pool.svg",
            "value": "aboveGroundPool"
        },
        {
            "label": "Trampoline",
            "image": "trampoline.svg",
            "value": "trampoline"
        },
        {
            "label": "Dog",
            "image": "dog.svg",
            "value": "dog"
        }
    ]
}
```

## Multiple text input fields

`/components/MultiField.js`

Displays a text input for each field provided, and a button to save answers and advance users to the next question.

### MultiField usage

The multiple text input component is used like this:

```javascript
<MultiField 
    data = {this.props.data} //data object for single question to render
    handleAnswer={(answerData) => this.handleAnswer(answerData)} //pass the function to call when the button is clicked
    currentAnswer = {this.props.answer} //pass current answer object (used to set state of the component when rendered)
/>
```

### MultiField Data object

```JSON
"name": {
    "displayOrder": 2,
    "type": "multifield",
    "headline": "Headline text",
    "subhead": "Optional subhead",
    "fields": [
        {
            "datalabel": "firstname",
            "label": "First Name",
            "type": "text"
        },
        {
            "datalabel": "lastname",
            "label": "Last Name",
            "type": "text"
        }
    ],
    "buttonLabel" : "Go"
}
```

## Picker

`/somponents/Picker.js`

Displays a card for each option provided. Clicking on a card stores its dataLabel into the answer object and advances the user to the next question. 

### Picker usage

```javascript
<Picker
    data={this.props.data} //data object for single question to render
    handleAnswer={(answerData) => this.handleAnswer(answerData)} //pass the function to call when a card is clicked
    currentAnswer={this.props.answer} //pass current answer object (used to set state of the component when rendered)
/>
```

### Picker Data object

```JSON
"policyType": {
    "displayOrder": 3,
    "datalabel": "policyType",
    "type": "picker",
    "headline": "Headline text",
    "subhead": "Optional subhead",
    "options": [
        {
            "label": "Own",
            "image": "own.svg",
            "datalabel": "owner"
        },
        {
            "label": "Rent",
            "image": "rent.svg",
            "datalabel": "renter"
        }
    ]
}
```

## TODO

* validation: currently no validation of inputs, or data properties to describe validation criteria

* address input component: stub component at /components/AddressInput.js follows Multiinput pattern, but needs to initially display single field for address lookup, and mutliple fields for address checking. May need specific state routing within the component.

* recursive question traversing: suplementary questions will need to be asked based on the answer selected for the parent question. As these could be multiple steps deep, a recursive question system could be useful. routing would need to bubble back up through the layers to check which question to show next.

* tracking / analytics of user progress 

* push questions into browser history

* store progress in local storage, and provide users with an option to start fresh when they reload the page and the local storage is fetched

* API / DB integration

* full keyboard control for all input types

* suplementary info modals, linked to questions in questions.json

* forward button once user has clicked back

* styling and layout to match designs