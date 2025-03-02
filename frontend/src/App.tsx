import React, { useState, useEffect, useRef } from "react";
import Select, { StylesConfig} from "react-select";
import {BarChart, Bar, XAxis, YAxis, LabelList} from "recharts";

// Currently available songs (potentially make this a database)
const directories = ["/ymca", "/uptown funk", "/toxic", ];
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
 // const [winCount, setwinCount] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const selectRef = useRef<any>(null);
  const [showHighScores, setHighScores] = useState<boolean>(false);
  let [gamestate, setGameState] = useState<string>("");
  
  let winVar = localStorage.getItem("Win");
  let lossVar = localStorage.getItem("Loss");
  if (winVar === null){
    winVar = "0";
  }
  localStorage.setItem("Win", winVar);
  if (lossVar === null){
    lossVar = "0";
  }
  localStorage.setItem("Loss", lossVar);

  let one = localStorage.getItem("1");
  let two = localStorage.getItem("2");
  let three = localStorage.getItem("3");
  let four = localStorage.getItem("4");
  let five = localStorage.getItem("5");
  let fail = localStorage.getItem("Fail");


  if (one === null){
    one = "0";
  }
  localStorage.setItem("1", one);

  if (two === null){
    two = "0";
  }
  localStorage.setItem("2", two);

  if (three === null){
    three = "0";
  }
  localStorage.setItem("3", three);

  if (four === null){
    four = "0";
  }
  localStorage.setItem("4", four);

  if (five === null){
    five = "0";
  }
  localStorage.setItem("5", five);

  if (fail === null){
    fail = "0";
  }
  localStorage.setItem("Fail", fail);


  const data = [
    { category: 1, value: Number(one)},
    { category: 2, value: Number(two) },
    { category: 3, value: Number(three)},
    { category: 4, value: Number(four)},
    { category: 5, value: Number(five)},
    { category: "✖", value: Number(fail)},
  ]


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
      // alert(`Correct! "${selectedDirectory2}". "${chosenSong}"`);
      setGameState("You Won!");
      gamestate = "You Won!"
      const statevar = [...guessState];
      statevar[activeIndex] = "✅";
      setGuessState(statevar);
      setKeepPlaying(false);
      let winNum = localStorage.getItem("Win");
      if (winNum === null) {
        winNum = "0";
      } 
      else {
        winNum = (Number(winNum) + 1).toString(); 
      }
      localStorage.setItem("Win", winNum);

      let guessesnum = localStorage.getItem((guesses+1).toString());
      if (guessesnum === null) {
        guessesnum = "1";
      } 
      else{
        guessesnum = (Number(guessesnum) + 1).toString(); 
      }
      localStorage.setItem((guesses+1).toString(), guessesnum);

      // // localStorage.Win = String(Number(localStorage.Win) + Number(1));
      // setwinCount(winCount => winCount+1);

    }
    else if (selectedDirectory2 !== selectedDirectory && index === files.length - 1 && gamestate !== "You Won!") {
      // alert(`Incorrect! "${selectedDirectory2}"."${chosenSong}"`);
      setGameState("You Lost!");
      const statevar = [...guessState];
      statevar[activeIndex] = "❌";
      setGuessState(statevar);
      setKeepPlaying(false);
      let lossNum = localStorage.getItem("Loss");
      if (lossNum === null) {
        lossNum = "0";
      } 
      else {
        lossNum = (Number(lossNum) + 1).toString(); 
      }
      localStorage.setItem("Loss", lossNum);


      let guessesfail = localStorage.getItem("Fail");
      if (guessesfail === null) {
        guessesfail = "1";
      } 
      else{
        guessesfail = (Number(guessesfail) + 1).toString(); 
      }
      localStorage.setItem("Fail", guessesfail);

    }
    else if (selectedDirectory2 !== selectedDirectory) {
      // alert(`Incorrect! "${selectedDirectory2}"."${chosenSong}"`);
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
  const fetchFullSongName = async () => {
    try {
      const response = await fetch("/songs.txt");
  
      if (!response.ok) {
        throw new Error(`Failed to fetch songs: ${response.status} ${response.statusText}`);
      }
  
      const fileContent = await response.text();
      const songLines = fileContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
  
        setSongs((prevSongs) => {
          return JSON.stringify(prevSongs) === JSON.stringify(songLines) ? prevSongs : songLines;
        });
  
      const foundSong = songLines.find((line) =>
        line.toLowerCase().startsWith(chosenSong.toLowerCase() + " -")
      );
  
      setFinalSong(foundSong ?? "Song not found");
    } catch (error) {
      console.error("Error fetching songs:", error);
      setFinalSong("Error fetching song list. Please try again later.");
    }
  };
  
  useEffect(() => {
    fetchFullSongName();
  }, []); //
  
  
  // Effect to update progress every second
  useEffect(() => {
    setInterval(() => {
      setProgress(audioInstances.map((audio) => audio.currentTime));
    }, 1);
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

  // Detect system dark mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);


  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (provided) => ({
      ...provided,
      width: "330px",
      "@media (max-width: 768px)": {
        width: "265px",
      },
      "@media (max-width: 400px)": {
        width: "230px",
      },
      backgroundColor: isDark ? "#222" : "white",
      color: isDark ? "white" : "black",
      borderColor: isDark ? "#444" : "#ccc",
      borderRadius: "4px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? "#222" : "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "darkgreen" : "",
      "&:hover": { backgroundColor: state.isSelected ? "#192E49" : "#88E788;" },
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? "white" : "black",
    }),
    input: (provided) => ({
      ...provided,
      color: isDark ? "white" : "black", 
    }),
  };


  return (
    <div>
      <div>
        <h1 style={{ fontSize: "40px" }}><center>🥁 Bandle 🎸</center></h1>
        <hr style={{ marginBottom: "15px" }}></hr>
        <div style = {{border: "0"}} className="song-component">
        <h3> Guess the Song!<button style={{right: "0px", borderRadius: "50%", paddingLeft: "8px", paddingRight: "8px"}} className="right-content" onClick={() => setShowInstructions(true)}>
          <i style={{alignItems: "right"}} className="fa fa-question"></i>
          </button>
          
        </h3>
        </div>
        {/* <div>Wins: {winVar}  Losses: {lossVar}</div> */}

        {showHighScores && (
          <div style={{ alignContent: "center", textAlign: "center" }} className="modal-overlay" onClick={() => setHighScores(false)}>
            <div style={{ width: window.innerWidth > 1024 ? 500: window.innerWidth > 768 ? 500 : window.innerWidth > 480 ? 450: window.innerWidth > 375 ? 400: 350, color: isDark ? "white" : "black", background: isDark ? "#222" : "white", alignContent: "center" }} className="modal-box" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: "25px", marginBottom: "20px" }}>High Scores</h3>
                  <BarChart  width={window.innerWidth > 1024 ? 500: window.innerWidth > 768 ? 500 : window.innerWidth > 480 ? 450 : window.innerWidth > 375 ? 400: 350} height={250} data={data} layout="vertical" barCategoryGap={3}>
                    <YAxis dataKey="category" type="category" width={30} axisLine={false} tickLine={false} tick={{ dx: -10 }} style={{ fontWeight: "bolder", fill: isDark ? "white" : "black" }} />
                    <XAxis type="number" hide />
                    <Bar dataKey="value" fill="#4CAF50" radius={[5, 5, 5, 5]}>
                      <LabelList dataKey="value" position="insideRight" fill="white" fontWeight="bold" dx={-3} formatter={(value: number) => (value > 0 ? value : "")} />
                    </Bar>
                  </BarChart>
              <button style={{ marginTop: "20px" }} className="play-pause-button" onClick={() => setHighScores(false)}>Ok!</button>
            </div>
          </div>
        )}

        {showInstructions && (
        <div className="modal-overlay" onClick={() => setShowInstructions(false)}>
          <div style = {{color: isDark ? "white" : "black", background: isDark ? "#222" : "white", }} className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 style = {{color: isDark ? "white" : "black"}}>Welcome to Bandle!</h2>
            
            <p style={{margin: "30px"}}>Guess the correct song by listening to different instrument tracks 🎵</p>
            <ul>
              <li>The game randomly selects a song, but you won’t know which one.</li>
              <li>The first round starts with just the drums playing.</li>
              <li>With each incorrect guess, a new instrument is added.</li>
              <li>After listening, type your guess in the search box and submit it.</li>
              <li>If your guess is correct, you win! 🎉</li>
              <li>If you reach the final round and still guess incorrectly, game over!</li>
            </ul>
            <div style={{textAlign:"center", marginTop: "30px", marginBottom: "30px"}}>
            <button className = "play-pause-button" onClick={() => setShowInstructions(false)}>Lets play!</button>
              </div> 
          </div>
        </div>
        )}
      </div>
      <div className="components-container">
        {components.map((comp, index) => (
          <div key={comp.id} className={`song-component ${index === activeIndex ? "active" : ""}`}>
            <h3>{comp.type === "other" ? "SYNTH + OTHER" : comp.type.toUpperCase()}</h3>
            <h3 style={{ opacity: guessState[index] === "⚪" ? 0 : 1 }} className="right-content"> {guessState[index]}</h3>
          </div>
        ))}
      </div>
      {(gamestate === "") && (
        <div className="play-pause-progress">
          {/* <progress style={{ marginTop: "14px", width: "110%"}} value={progress[activeIndex]} max={durations[activeIndex] || 1}></progress> */}
          {/* <p style={{ paddingTop: "17px" }}><b>{formatTime(progress[activeIndex])} / {formatTime(durations[activeIndex])}</b> </p> */}
          <button style = {{marginRight: "10px"}} className="play-pause-button" disabled={!keepPlaying} onClick={() => playPause(activeIndex)}>
            {isPlaying[activeIndex] ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
          </button>
          <progress style={{width: "80%", marginRight: "14px", marginTop: "6px", backgroundColor: isDark ? "#323332":  "#f7f5f5"}} value={progress[activeIndex]} max={durations[activeIndex] || 1}></progress>
          
          <button className="play-pause-button" disabled={!keepPlaying} onClick={() => restartSong(activeIndex)}>
            <i className="fa fa-refresh"></i>
          </button>
          {/* <button className="play-pause-button" disabled={!keepPlaying} onClick={() => restartSong(activeIndex)}>
            <p>Skip</p>
          </button>  */}
          
        </div>
      )}
      {!gamestate && (
        <div className="submission-div">
          <form className="form_class" onSubmit={(event) => compareInput(event, activeIndex)}>
          <div onFocus={(e) => e.preventDefault()}>
            <Select
              ref={selectRef}
              options={songs.map((song) => {
                const actualSongName = song;
                const songName = song.split("-")[0].trim().toLowerCase();
                return { value: songName, label: actualSongName };
              })}
              styles={customStyles}
              isDisabled={!keepPlaying}
              onChange={(selectedOption) => {
                setSelectedDirectory(selectedOption?.value || "");
              }}
              placeholder="Search for a song..."
              menuPlacement="top"
              maxMenuHeight={300}
              inputValue={inputValue || ""}
              onInputChange={(value) => { { setInputValue(value || ""); } }}
              required
              noOptionsMessage={() => "Uh-oh! Song not found!"}
              filterOption={(option, input) =>
                input.length > 0 && option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
            </div>
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
          <button className="play-again-high-score" disabled={keepPlaying} onClick={() => setHighScores(true)}>
            <h4>High Scores</h4>
            {/* // Implement high score backend tracking */}
          </button>
        </div>
      )}
    </div>
  );
};

// // Helper function to format time
// const formatTime = (time: number): string => {
//   const mins = Math.floor(time / 60);
//   const secs = Math.floor(time % 60);
//   return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
// };

export default Bandle;