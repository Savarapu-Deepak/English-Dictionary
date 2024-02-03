"use strict";

const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaning = document.getElementById("meaning-container");
const title = document.getElementById("title");
const mean = document.getElementById("meaning");
const audio = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    meaning.style.display = "none";
    infoTextEl.style.display = "block";
    infoTextEl.textContent = `Searching for the word "${word}"`;
    const Url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(Url).then((res) => res.json());

    if (result.title) {
      title.textContent = word;
      mean.textContent = "Not A Proper Word";
      audio.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaning.style.display = "block";
      audio.style.display = "Inline-Flex";
      title.textContent = result[0].word;
      title.style.textTransform = "Capitalize";
      title.style.color = "Gold";
      mean.textContent = result[0].meanings[0].definitions[0].definition;
      mean.style.color = "Cyan";
      audio.src = result[0].phonetics[0].audio;
    }
  } catch (error) {}
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
