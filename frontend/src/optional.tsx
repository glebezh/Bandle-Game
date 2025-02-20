 // YOUTUBE API CODE
  // useEffect(() => {
  //   async function getYouTubeSongData(chosenSong: string) {
  //     const apiKey ="";
  //     const searchQuery = `espresso official music video`;
  //     const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`;
      
  //     try {
  //       const searchResponse = await fetch(searchUrl);
  //       const searchData = await searchResponse.json();
        
  //       if (searchData.items.length > 0) {
  //         const videoId = searchData.items[0].id.videoId;
  //         const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${apiKey}`;
          
  //         const videoResponse = await fetch(videoUrl);
  //         const videoData = await videoResponse.json();
          
  //         if (videoData.items.length > 0) {
  //           const views = videoData.items[0].statistics.viewCount;
  //           setViews(views);  // assuming `setViews` is a state setter function
  //           const releaseDate = videoData.items[0].snippet.publishedAt;
  //           setReleaseDate(releaseDate);  // assuming `setReleaseDate` is a state setter function
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching YouTube data:", error);
  //     }
  //   }
  
  //   getYouTubeSongData(chosenSong);
  // }, [chosenSong]); // Add `chosenSong` as a dependency

//   function convertToViews (labelValue: number) {
//     // Nine Zeroes for Billions
//     return Math.abs(Number(labelValue)) >= 1.0e+9

//     ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + "B"
//     // Six Zeroes for Millions 
//     : Math.abs(Number(labelValue)) >= 1.0e+6

//     ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
//     // Three Zeroes for Thousands
//     : Math.abs(Number(labelValue)) >= 1.0e+3

//     ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"

//     : Math.abs(Number(labelValue));

// }

// const getDifficultyLevel = (views: number) => {
//   if (views === 0){
//     return "";
//   }
//   if (views > 500000000) {
//     return "Easy";
//   } else if (views < 40000000) {
//     return "Hard";
//   } else if (views == 0){
//     return "";
//   }
//   else{
//     return "Medium"
//   }
// };

 {/* <div style={{display: "flex", textAlign: "center", justifyContent: "space-between", paddingRight: "40px", paddingLeft: "40px", border: "1px solid black", marginBottom: 
        "10px", borderRadius: "10px", paddingTop: "2px", paddingBottom: "2px"
      }}> */}
      {/* <div>
        <div>Release</div> */}
        {/* <br></br> */}
        {/* <b>{releaseDate?.toString()[0]}{releaseDate?.toString()[1]}{releaseDate?.toString()[2]}{releaseDate?.toString()[3]}</b>
      </div> */}
      {/* <div>
        <div>Views</div>
          <br></br> */}
        {/* <b>{views}</b> */}
      {/* </div>
      <div>
        <div>Difficulty</div> */}
        {/* <br></br> */}
        {/* <b>{views}</b>
      </div> */}
      {/* </div> */}
      {/* <h4><center>Difficulty</center></h4>
      <h4><center>Release Year</center></h4> */}
      {/* <h2><center>Number of Guesses: {guesses}</center></h2> */}