import React from "react";
import randomWord from "random-words";
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
    };
    this.getUserLetter = this.getUserLetter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getNewWord();
  }

  getNewWord() {
    const word = randomWord();
    this.setState({
      letters: word.split(""),
      emptyWord: new Array(word.length).fill("*"),
      guesses: 0,
      message: "",
      disabled: "",
    });
  }

  checkWin() {
    if (this.state.guesses === 6) {
      this.setState({
        guesses: 0,
        message: "Sorry, you did not guess the word",
        disabled: "disabled",
      });
      setTimeout(() => {
        this.getNewWord();
      }, 2000);
    }
    const realWord = this.state.letters.join("");
    const userGuessedWord = this.state.emptyWord.join("");
    return realWord === userGuessedWord;
  }

  getUserLetter(event) {
    this.setState({ userLetter: event.target.value });
  }

  handleSubmit(event) {
    let i;
    let invalidGuess = true;
    for (i = 0; i < this.state.letters.length; i++) {
      if (this.state.userLetter === this.state.letters[i]) {
        let temp = this.state.emptyWord;
        temp[i] = this.state.userLetter;
        this.setState({ emptyWord: temp, userLetter: "" });
        invalidGuess = false;
      }
    }
    if (invalidGuess) {
      this.setState({
        guesses: this.state.guesses + 1,
        userLetter: "",
        message: "",
      });
    }
    if (this.checkWin()) {
      this.setState({
        message: "Congratulations, that is the right word",
        disabled: "disabled",
      });
      setTimeout(() => {
        this.getNewWord();
      }, 2000);
    }
    event.preventDefault();
  }
  render() {
    return (
      <div className="App">
        <HangmanImage sequence={this.state.guesses} />
        <Message messageState={this.state.message} />
        <h1>{this.state.letters}</h1>
        <div className="word">
          {this.state.emptyWord.map((letter, index) => (
            <span className="letter" key={index}>
              {letter}
            </span>
          ))}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.userLetter}
            maxLength="1"
            onChange={this.getUserLetter}
            disabled={this.state.disabled}
          ></input>
          <input type="submit" value="Submit" disabled={this.state.disabled} />
        </form>
        <div>
          <h3>strikes:{this.state.guesses}</h3>
        </div>
      </div>
    );
  }
}

export default App;
