import axios from "axios";

async function getWord() {
  let word = "test";
  const apiKey = "kbwfoof2dohz4u8avcqewqxndckm2lngywa8fznl3vi7gxkdr";
  axios
    .get(`http://api.wordnik.com/v4/words.json/randomWord?api_key=${apiKey}`)
    .then((response) => {
      console.log(response.data);
      word = response.data[0].word;
    });

  return word;
}

export default getWord;
