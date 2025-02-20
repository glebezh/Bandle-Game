import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import '../public/songs.txt';

// Currently available songs (potentially make this a database)
const directories = ["/levitating", "/espresso", "/blinding lights"];
const files = ["/drums.mp3", "/bass.mp3", "/guitar.mp3", "/other.mp3", "/vocals.mp3"];

const Bandle: React.FC = () => {
  // Randomly select a directory and extract the chosen song
  const [selectedDirectory] = useState(() => directories[Math.floor(Math.random() * directories.length)]);
  const chosenSong = selectedDirectory.split("/")[1].split(".")[0];

  // Initialize all song components with their audio instances
  const [components] = useState(() =>
    files.map((file, index) => ({
      id: index,
      type: file.split("/")[1].split(".")[0],
      file,
      directory: selectedDirectory,
    }))
  );

  // State to manage audio instances
  const [audioInstances] = useState(() => components.map((comp) => new Audio(comp.directory + comp.file)));

  // State to track play status, progress, and duration for each track
  const [isPlaying, setIsPlaying] = useState<boolean[]>(Array(components.length).fill(false));
  const [progress, setProgress] = useState<number[]>(Array(components.length).fill(0));
  const [durations, setDurations] = useState<number[]>(Array(components.length).fill(0));
  const [selectedDirectory2, setSelectedDirectory] = useState("");
  const [guesses, SetGuesses] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [songs, setSongs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [guessState, setGuessState] = useState<string[]>(Array(components.length).fill("⚪"));
  const [keepPlaying, setKeepPlaying] = useState<boolean>(true);
  const [finalSong, setFinalSong] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean[]>(
    Array(components.length).fill(true).map((_, index) => index === 0 ? false : true)
  );
  const selectRef = useRef<any>(null);
  let [gamestate, setGameState] = useState<string>("");

  // Optional for youtube API integration
  // const [releaseDate, setReleaseDate] = useState<number>();
  // const [views, setViews] = useState<number>(0);

  // Play/pause function for each track
  const playPause = (index: number) => {
    const newPlayingState = [...isPlaying];

    for (let i = 0; i <= index; i++) {
      const audio = audioInstances[i];
      if (newPlayingState[i]) {
        audio.pause();
        newPlayingState[i] = false;
      }
      else {
        audio.play();
        newPlayingState[i] = true;
      }
    }
    setIsPlaying(newPlayingState);
  };

  // Function to restart song
  const restartSong = (index: number) => {
    for (let i = 0; i <= index; i++) {
      const audio = audioInstances[i];
      audio.currentTime = 0;
    }
  }
  // Function to compare user input to actual input
  const compareInput = (event: React.FormEvent, index: number) => {
    // Prevent button from refreshing page
    event.preventDefault();

    // Perform the comparison and determine gamestate for variables
    if (selectedDirectory2 === chosenSong) {
      // alert(`Correct! '${selectedDirectory2}'. '${chosenSong}'`);
      setGameState("You Won!");
      gamestate = "You Won!"
      const statevar = [...guessState];
      statevar[activeIndex] = "✅";
      setGuessState(statevar);
      setKeepPlaying(false);
    }
    else if (selectedDirectory2 !== selectedDirectory && index === files.length - 1 && gamestate !== "You Won!") {
      // alert(`Incorrect! '${selectedDirectory2}'.'${chosenSong}'`);
      setGameState("You Lost!");
      const statevar = [...guessState];
      statevar[activeIndex] = "❌";
      setGuessState(statevar);
      setKeepPlaying(false);
    }
    else if (selectedDirectory2 !== selectedDirectory) {
      // alert(`Incorrect! '${selectedDirectory2}'.'${chosenSong}'`);
      const statevar = [...guessState];
      statevar[activeIndex] = "❌";
      setGuessState(statevar);
    }

    // Disable the selected directory after submission
    const disabled = [...isDisabled];
    isDisabled[activeIndex] = true;
    if (activeIndex + 1 < disabled.length) {
      disabled[activeIndex + 1] = false;
    }
    setIsDisabled(disabled);

    // Iterate through all previous and current tracks and stop playback
    const newPlayingState = [...isPlaying];
    for (let i = 0; i <= index; i++) {
      const audio = audioInstances[i];
      if (newPlayingState[i]) {
        audio.pause();
        newPlayingState[i] = false;
      }
      audio.currentTime = 0;
    }
    setIsPlaying(newPlayingState);

    // While game is still going increment activeindex and increase number of guesses required
    if (gamestate == "") {
      SetGuesses(guesses + 1);
      if (activeIndex + 1 < disabled.length) {
        setActiveIndex(activeIndex => activeIndex + 1);
      }
    }
    // Clear value of input box
    selectRef.current?.clearValue();
    setSelectedDirectory("");
    setInputValue("");
  };

  // Effect to fetch song names from txt file and name of song chosen by program
  useEffect(() => {
    const fetchFullSongName = async () => {
      const response = await fetch("/songs.txt");
      const fileContent = await response.text();
      const songLines = fileContent.split("\n").map((line) => line.trim()).filter((line) => line !== "");
      setSongs(songLines);
      const foundSong = songLines.find((line) =>
        line.toLowerCase().startsWith(chosenSong.toLowerCase() + " -")
      );
      setFinalSong(foundSong ?? "Song not found");
    };
    fetchFullSongName();
  }, []);

  // Effect to update progress every second
  useEffect(() => {
    setInterval(() => {
      setProgress(audioInstances.map((audio) => audio.currentTime));
    }, 1000);
    // Optional cleanup
    // return () => clearInterval(interval);
  }, []);

  // Effect to set durations when audio metadata is loaded
  useEffect(() => {
    const updateDurations = () => {
      setDurations(audioInstances.map((audio) => audio.duration || 0));
    };
    // Attach metadata listeners
    audioInstances.forEach((audio) => {
      audio.onloadedmetadata = updateDurations;
    });

    // Optional cleanup
    // return () => {
    //   audioInstances.forEach((audio) => {
    //     audio.pause();
    //     audio.onloadedmetadata = null;
    //   });
    // };
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ fontSize: "40px" }}><center>🥁 Bandle 🎸</center></h1>
        <hr style={{ marginBottom: "20px" }}></hr>
        <h3> Guess the Song!</h3>
      </div>
      <div className="components-container">
        {components.map((comp, index) => (
          <div key={comp.id} className={`song-component ${index === activeIndex ? "active" : ""}`}>
            <h3>{comp.type === "other" ? "SYNTH + OTHER" : comp.type.toUpperCase()}</h3>
            <h3 style={{ opacity: guessState[index] === '⚪' ? 0 : 1 }} className="right-content"> {guessState[index]}</h3>
          </div>
        ))}
      </div>
      {(gamestate === "") && (
        <div className="play-pause-progress">
          <progress style={{ marginTop: "14px" }} value={progress[activeIndex]} max={durations[activeIndex] || 1}></progress>
          <p style={{ paddingTop: "17px" }}><b>{formatTime(progress[activeIndex])} / {formatTime(durations[activeIndex])}</b> </p>
          <button style={{ marginLeft: "10px" }} className="play-pause-button" disabled={!keepPlaying} onClick={() => playPause(activeIndex)}>
            {isPlaying[activeIndex] ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
          </button>
          <button className="play-pause-button" disabled={!keepPlaying} onClick={() => restartSong(activeIndex)}>
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      )}
      {!gamestate && (
        <div className="submission-div">
          <form className="form_class" onSubmit={(event) => compareInput(event, activeIndex)}>
            <Select
              ref={selectRef}
              options={songs.map((song) => {
                const actualSongName = song;
                const songName = song.split("-")[0].trim().toLowerCase();
                return { value: songName, label: actualSongName };
              })}
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "300px",
                }),
              }}
              isDisabled={!keepPlaying}
              onChange={(selectedOption) => {
                setSelectedDirectory(selectedOption?.value || "");
              }}
              placeholder="Search for a song..."
              menuPlacement="top"
              maxMenuHeight={200}
              inputValue={inputValue || ""}
              onInputChange={(value) => { { setInputValue(value || ""); } }}
              required
              noOptionsMessage={() => "Keep Typing!"}
              filterOption={(option, input) =>
                input.length > 1 && option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
            <input className="submit-button" type="submit" value="Submit" disabled={!keepPlaying} />
          </form>
        </div>
      )}
      {gamestate && (
        <div className="result-div">
          {gamestate} The correct answer was
          <div><h3><b>{finalSong}</b></h3></div>
          {/* <a href="https://www.youtube.com"><i className="fa fa-youtube-play"></i></a> */}
        </div>
      )}
      {gamestate && (
        <div className="new-game">
          <button className="play-again-high-score" disabled={keepPlaying} onClick={() => window.location.reload()}>
            <h4>Play Again</h4>
          </button>
          <button className="play-again-high-score" disabled={keepPlaying} onClick={() => window.location.reload()}>
            <h4>High Scores</h4>
            {/* // Implement high score backend tracking */}
          </button>
        </div>
      )}
    </div>
  );
};

// Helper function to format time
const formatTime = (time: number): string => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default Bandle;
