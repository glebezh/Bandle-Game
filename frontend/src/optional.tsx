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


      fetch("https://www.linkedin.com/voyager/api/graphql?action=execute&queryId=voyagerIdentityDashProfileEditFormPages.f1e638355eccbf2eef390ececec21df6", {
        "headers": {
          "accept": "application/vnd.linkedin.normalized+json+2.1",
          "accept-language": "en-US,en;q=0.9,ru;q=0.8",
          "content-type": "application/json; charset=UTF-8",
          "csrf-token": "ajax:2276672465561265929",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": "\"Android\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-li-lang": "en_US",
          "x-li-page-instance": "urn:li:page:d_flagship3_profile_self_edit_project;SajrzHziQv2pUhL6OG9Hsg==",
          "x-li-pem-metadata": "Voyager - Profile - AddEdit=project-profile-edit-form-post",
          "x-li-track": "{\"clientVersion\":\"1.13.30865\",\"mpVersion\":\"1.13.30865\",\"osName\":\"web\",\"timezoneOffset\":10.5,\"timezone\":\"Australia/Adelaide\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1.75,\"displayWidth\":2240,\"displayHeight\":1401.75}",
          "x-restli-protocol-version": "2.0.0"
        },
        "referrer": "https://www.linkedin.com/in/glebe-zhivoglyadov/details/projects/edit/forms/609438564/?profileFormEntryPoint=PROFILE_SECTION",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{\"variables\":{\"formElementInputs\":[{\"formElementUrn\":\"urn:li:fsd_profileEditFormElement:(PROJECT,urn:li:fsd_profileProject:(ACoAAEAyC98BaNjyHk-uFZ4lb2aD873AkLJFrok,609438564),/url)\",\"formElementInputValues\":[{\"textInputValue\":\"https://github.com/glebezh/Bandle-Game\"}]}],\"trackingId\":\"Î\\u0012D{èBæí\\u0012ö%\\u0019|\",\"initialFlowEntryPoint\":\"PROFILE_SECTION\"},\"queryId\":\"voyagerIdentityDashProfileEditFormPages.f1e638355eccbf2eef390ececec21df6\"}",
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      });