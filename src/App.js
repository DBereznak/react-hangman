import React from "react";
import {generate } from "random-words";
import HangmanImage from "./HangmanImage";
import Message from "./Message";
import "./styles/app.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      letters: [],
      emptyWord: [],
      userLetter: "",
      guesses: 0,
      message: "",
      disabled: "",
      wordsCorrect: 0,
      displayButton: {display: "none"}
    };
    this.getUserLetter = this.getUserLetter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNewWord = this.getNewWord.bind(this);
  }

  componentDidMount() {
    this.getNewWord();
  }

  getNewWord() {
    const word = generate({ minLength: 5, maxLength: 10 });
    console.log(word);
    this.setState({
      letters: word.split(""),
      emptyWord: new Array(word.length).fill("*"),
      guesses: 0,
      message: "",
      letterDisabled: "",
      buttonDisabled: "disabled",
      displayButton: {display: "none"},
    });
  }

  checkWin() {
    if (this.state.guesses === 5) {
      this.setState({
        guesses: 6,
        message: `Sorry, you did not guess the word. The word was  ${this.state.letters.join(
          ""
        )}`,
        disabled: "disabled",
        displayButton: {display: "block"},
      });
    }
    const realWord = this.state.letters.join("");
    const userGuessedWord = this.state.emptyWord.join("");
    return realWord === userGuessedWord;
  }

  getUserLetter(event) {
    if (event.target.value.length > 0) {
      this.setState({ buttonDisabled: "" });
    } else {
      this.setState({ buttonDisabled: "disabled" });
    }
    this.setState({ userLetter: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let i;
    let invalidGuess = true;
    for (i = 0; i < this.state.letters.length; i++) {
      if (this.state.userLetter === this.state.letters[i]) {
        let temp = this.state.emptyWord;
        temp[i] = this.state.userLetter;
        this.setState({ emptyWord: temp, userLetter: "", buttonDisabled: "disabled" });
        invalidGuess = false;
      }
    }
    if (invalidGuess) {
      this.setState({
        guesses: this.state.guesses + 1,
        userLetter: "",
        message: "",
        buttonDisabled: "disabled",
      });
    }
    if (this.checkWin()) {
      this.setState({
        message: `Congratulations, ${this.state.letters.join(
          ""
        )} is the right word`,
        disabled: "disabled",
        displayButton: {display: "block"},
        wordsCorrect: this.state.wordsCorrect + 1
      });
    }
  }
  render() {
    return (
      <div className="App ui box">
        <header className="ui center aligned header">
          <img
            style={{ width: "100%", backgroundColor: "#35aadc", margin: "0 auto" }}
            src="https://res.cloudinary.com/album/image/upload/v1614735885/hangman/Hangman-Titlecard_800px.png"
            alt="Hangman"
          />
        </header>
        <HangmanImage sequence={this.state.guesses} correctWordCount={ this.state.wordsCorrect} />

        <div className="content ui segment">
          <div className="left">
          <div className="word center aligned">
            {this.state.emptyWord.map((letter, index) => (
              <span className="letter" key={index}>
                {letter}
              </span>
            ))}
          </div>
          <form>
            <input
              type="text"
              value={this.state.userLetter.toLowerCase()}
              maxLength="1"
              onChange={this.getUserLetter}
              disabled={this.state.letterDisabled}
            ></input>
            <button class="button" disabled={this.state.buttonDisabled} onClick={(event) => this.handleSubmit(event)}>Submit</button>
          </form>
            <h3 class="strikes">strikes:{this.state.guesses}</h3>
          </div>
          <div className="right">
          <Message messageState={this.state.message} />
          <button className="button" style={this.state.displayButton} onClick={this.getNewWord}>Play Again</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
