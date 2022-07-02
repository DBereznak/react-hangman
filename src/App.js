import React from "react";
import randomWord from "random-words";
//import getWord from "./getWord";
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
    const word = randomWord();
    console.log(word);
    this.setState({
      letters: word.split(""),
      emptyWord: new Array(word.length).fill("*"),
      guesses: 0,
      message: "",
      disabled: "",
      displayButton: {display: "none"},
    });
  }

  checkWin() {
    if (this.state.guesses > 4) {
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
        message: `Congratulations, ${this.state.letters.join(
          ""
        )} is the right word`,
        disabled: "disabled",
        displayButton: {display: "block"},
      });
    }
    event.preventDefault();
  }
  render() {
    let button = "Hio there";
    if(this.state.finishedRound) {
      button = <button onClick={this.getNewWord}>Play Again</button>;
    } else {
      button = "";
    }
    return (
      <div className="App ui box">
        <header className="ui center aligned header">
          <img
            style={{ width: "100%" }}
            src="https://res.cloudinary.com/album/image/upload/v1614735885/hangman/Hangman-Titlecard_800px.png"
            alt="Hangman"
          />
        </header>
        <HangmanImage sequence={this.state.guesses} />

        <div className="content ui segment">
          <div className="word center aligned">
            {this.state.emptyWord.map((letter, index) => (
              <span className="letter" key={index}>
                {letter}
              </span>
            ))}
          </div>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.userLetter.toLowerCase()}
              maxLength="1"
              onChange={this.getUserLetter}
              disabled={this.state.disabled}
            ></input>
            <input
              type="submit"
              value="Submit"
              disabled={this.state.disabled}
            />
          </form>
          <div>
            <h3>strikes:{this.state.guesses}</h3>
          </div>
          <Message messageState={this.state.message} />
          <div><button style={this.state.displayButton} onClick={this.getNewWord}>Play Again</button></div>
        </div>
      </div>
    );
  }
}

export default App;
