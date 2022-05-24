import { teamOrder as teamInfo} from "./teamInfo.js";

let unrankedBoard = [];
let rankedBoard = [];
let submitJSON = [];

let unRBar;
let unRBarName;
let unRBarRecord21;
let unRBarSOS;
let unRBarInput;
let unRBarRankButton;
let unRBarFiller;
let unRBarFillerT;

let rBar;
let rBarUnrankButton;
let rBarRankNum;
let rBarName;
let rBarInput;
let rBarRankButton;
let rBarUpButton;
let rBarDownButton;


window.onload = () => { loadPage(); };

function loadPage(){
  createBoard();
}

function createBoard(){
  for(let i=0;i<teamInfo.length;i++){
    unrankedBoard[i] = new Line(i + 33, teamInfo[i].name, teamInfo[i].key);
    rankedBoard[i] = new Line(i + 1, "empty", null);
  }
  updateUnrankedBoard();
  updateRankedBoard();
}

function updateUnrankedBoard(){
  document.getElementById("unranked-board").innerHTML = "";
  if(unrankedBoard.length > 0){
    for(let i=0;i<unrankedBoard.length;i++){
      if(unrankedBoard[i].name !== null){
        unRBar = document.createElement("div");
        unRBar.classList.add("left-bar");
        unRBar.id = unrankedBoard[i].name + "-BAR-" + unrankedBoard[i].key;
        unRBar.classList.add("unranked");
        document.getElementById("unranked-board").append(unRBar);
  
        unRBarName = document.createElement("span");
        unRBarName.id = "UN-"+unrankedBoard[i].name + "-" + unrankedBoard[i].key;
        unRBarName.classList.add("team-name");
        unRBarName.classList.add(unrankedBoard[i].name);
        unRBarName.innerHTML = unrankedBoard[i].name;
        document.getElementById(unrankedBoard[i].name + "-BAR-" + unrankedBoard[i].key).append(unRBarName);
  
        unRBarRecord21 = document.createElement("span");
        unRBarRecord21.id = "UTR-"+unrankedBoard[i].name + "-" + unrankedBoard[i].key;
        unRBarRecord21.classList.add("team-record-TT");
        unRBarRecord21.innerHTML = teamInfo[unrankedBoard[i].key].record21;
        document.getElementById(unrankedBoard[i].name + "-BAR-" + unrankedBoard[i].key).append(unRBarRecord21);
  
        unRBarSOS = document.createElement("span");
        unRBarSOS.id = "US-"+unrankedBoard[i].name + "-" + unrankedBoard[i].key;
        unRBarSOS.classList.add("team-sos");
        unRBarSOS.innerHTML = teamInfo[unrankedBoard[i].key].SOS;
        document.getElementById(unrankedBoard[i].name + "-BAR-" + unrankedBoard[i].key).append(unRBarSOS);
  
        unRBarInput = document.createElement("input");
        unRBarInput.id = "UI-"+unrankedBoard[i].name +  "-" + unrankedBoard[i].key;
        unRBarInput.classList.add("team-rank-box");
        document.getElementById(unrankedBoard[i].name + "-BAR-" + unrankedBoard[i].key).append(unRBarInput);
  
        unRBarRankButton = document.createElement("button");
        unRBarRankButton.id = "RIB-"+unrankedBoard[i].name +  "-" + unrankedBoard[i].key;
        unRBarRankButton.classList.add("team-rank-button");
        unRBarRankButton.innerHTML = "&#10148";
        unRBarRankButton.addEventListener("click", initialRankAssign);
        document.getElementById(unrankedBoard[i].name + "-BAR-" + unrankedBoard[i].key).append(unRBarRankButton);
      }
    }
  } else {
    unRBarFiller = document.createElement("button");
    unRBarFiller.id = "submit-button";
    unRBarFiller.innerHTML = "SUBMIT";
    unRBarFiller.addEventListener("click", getSubmitJSON);
    document.getElementById("unranked-board").append(unRBarFiller);

    unRBarFillerT = document.createElement("textarea");
    unRBarFillerT.id = "submit-text-area";
    unRBarFillerT.innerHTML = "";
    document.getElementById("unranked-board").append(unRBarFillerT);
  }
}

function updateRankedBoard(){
  document.getElementById("ranked-board").innerHTML = "";
  for(let i=0;i<rankedBoard.length;i++){
    rBar = document.createElement("div");
    rBar.classList.add("right-bar");
    rBar.id = "RBar-" + i;
    rBar.classList.add("ranked");
    document.getElementById("ranked-board").append(rBar);

    rBarUnrankButton = document.createElement("button");
    rBarUnrankButton.id = "UB-"+ rankedBoard[i].name + "-" + rankedBoard[i].key;
    rBarUnrankButton.classList.add("team-unrank-button");
    rBarUnrankButton.innerHTML = "&#11164";
    rBarUnrankButton.addEventListener("click", unrankAssign);
    document.getElementById("RBar-" + i).append(rBarUnrankButton);

    rBarRankNum = document.createElement("span");
    rBarRankNum.classList.add("team-rank-num");
    rBarRankNum.innerHTML = rankedBoard[i].rank;
    document.getElementById("RBar-" + i).append(rBarRankNum);

    rBarName = document.createElement("span");
    rBarName.id = "RN-"+rankedBoard[i].name + "-" + rankedBoard[i].key;
    rBarName.classList.add("team-name");
    rBarName.classList.add(rankedBoard[i].name);
    if (rankedBoard[i].name === "empty"){
      rBarName.innerHTML = "- - -";
    } else {
      rBarName.innerHTML = rankedBoard[i].name;
    }
    document.getElementById("RBar-" + i).append(rBarName);

    rBarInput = document.createElement("input");
    rBarInput.id = "RI-"+rankedBoard[i].name + "-" + rankedBoard[i].key;
    rBarInput.classList.add("team-rank-box");
    document.getElementById("RBar-" + i).append(rBarInput);

    rBarRankButton = document.createElement("button");
    rBarRankButton.id = "RB-" + rankedBoard[i].name + "-" + rankedBoard[i].key;
    rBarRankButton.classList.add("team-rank-button");
    rBarRankButton.innerHTML = "&#10148";
    rBarRankButton.addEventListener("click", reRankAssign);
    document.getElementById("RBar-" + i).append(rBarRankButton);

    rBarUpButton = document.createElement("button");
    rBarUpButton.id = i + "-RUB-" + rankedBoard[i].name + "-" + rankedBoard[i].key;
    rBarUpButton.classList.add("team-reorder-button");
    rBarUpButton.innerHTML = "&#9650";
    rBarUpButton.addEventListener("click", swapRankedUp);
    document.getElementById("RBar-" + i).append(rBarUpButton);

    rBarDownButton = document.createElement("button");
    rBarDownButton.id = i + "-RDB-" + rankedBoard[i].name + "-" + rankedBoard[i].key;
    rBarDownButton.classList.add("team-reorder-button");
    rBarDownButton.classList.add("upside-down");
    rBarDownButton.innerHTML = "&#9660";
    rBarDownButton.addEventListener("click", swapRankedDown);
    document.getElementById("RBar-" + i).append(rBarDownButton);

    if(!rankedBoard[i].ranked){
      rBarUnrankButton.disabled = true;
      rBarInput.disabled = true;
      rBarRankButton.disabled = true;
      rBarUpButton.disabled = true;
      rBarDownButton.disabled = true;
    }

    if(i === 0){
      rBarUpButton.disabled = true;
      rBarUpButton.classList.add("hidden");
    }

    if(i === rankedBoard.length - 1){
      rBarDownButton.disabled = true;
      rBarDownButton.classList.add("hidden");
    }
  }
}

function initialRankAssign(){
  let activeTeamKey = this.id.split("-")[2];
  let activeTeamName = teamInfo[activeTeamKey].name;
  let initialRank = parseInt(document.getElementById("UI-"+activeTeamName+"-"+activeTeamKey).value);
  if (!Number.isInteger(initialRank)){
    document.getElementById("UI-"+activeTeamName+"-"+activeTeamKey).value = null;
    initialRank = null;
    return;
  } 
  if (initialRank < 1 || initialRank > 32){
    document.getElementById("UI-"+activeTeamName+"-"+activeTeamKey).value = null;
    initialRank = null;
    return;
  }
  let unrankedRank;
  for (let i=0;i<unrankedBoard.length;i++){
    if(activeTeamName === unrankedBoard[i].name){
      unrankedRank = i;
    }
  }

  checkRankAbility(initialRank);
  rankedBoard[initialRank - 1] = unrankedBoard[unrankedRank];
  rankedBoard[initialRank - 1].rank = initialRank;
  rankedBoard[initialRank - 1].ranked = true;
  unrankedBoard.splice(unrankedRank, 1);

  sortAndUpdateBoard();
}

function reRankAssign(){
  let activeTeamKey = this.id.split("-")[2];
  let activeTeamName = teamInfo[activeTeamKey].name;
  let reRank = parseInt(document.getElementById("RI-"+activeTeamName+"-"+activeTeamKey).value);
  if (!Number.isInteger(reRank)){
    document.getElementById("RI-"+activeTeamName+"-"+activeTeamKey).value = null;
    reRank = null;
    return;
  } 
  if (reRank < 1 || reRank > 32){
    document.getElementById("RI-"+activeTeamName+"-"+activeTeamKey).value = null;
    reRank = null;
    return;
  }
  let nativeRank;
  for (let i=0;i<rankedBoard.length;i++){
    if(activeTeamName === rankedBoard[i].name){
      nativeRank = i;
      rankedBoard[i].name = "empty";
      rankedBoard[i].key = null;
      rankedBoard[i].ranked = false;
    }
  }
  checkRankAbility(reRank);
  rankedBoard[reRank - 1].name = activeTeamName;
  rankedBoard[reRank - 1].key = activeTeamKey;
  rankedBoard[reRank - 1].rank = reRank;
  rankedBoard[reRank - 1].ranked = true;
  sortAndUpdateBoard();
}

function unrankAssign() {
  let activeTeamKey = this.id.split("-")[2];
  let activeTeamName = teamInfo[activeTeamKey].name;
  for (let i=0;i<rankedBoard.length;i++){
    if(rankedBoard[i].name === activeTeamName){
      rankedBoard[i].name = "empty";
      rankedBoard[i].key = null;
      rankedBoard[i].ranked = false;
    }
  }
  if (unrankedBoard.length === 0){
    unrankedBoard[0] = new Line(33, teamInfo[activeTeamKey].name, parseInt(activeTeamKey));
  } else {
    unrankedBoard[unrankedBoard.length] = new Line(unrankedBoard[unrankedBoard.length-1].rank + 1, teamInfo[activeTeamKey].name, parseInt(activeTeamKey));
  }
  sortAndUpdateBoard();
}

function swapRankedUp(){
  let activeSwap = parseInt(this.id.split("-")[0]);
  [rankedBoard[activeSwap].name, rankedBoard[activeSwap - 1].name] = [rankedBoard[activeSwap - 1].name, rankedBoard[activeSwap].name];
  [rankedBoard[activeSwap].key, rankedBoard[activeSwap - 1].key] = [rankedBoard[activeSwap - 1].key, rankedBoard[activeSwap].key];
  [rankedBoard[activeSwap].ranked, rankedBoard[activeSwap - 1].ranked] = [rankedBoard[activeSwap - 1].ranked, rankedBoard[activeSwap].ranked];
  sortAndUpdateBoard();
}

function swapRankedDown(){
  let activeSwap = parseInt(this.id.split("-")[0]);
  [rankedBoard[activeSwap].name, rankedBoard[activeSwap + 1].name] = [rankedBoard[activeSwap + 1].name, rankedBoard[activeSwap].name];
  [rankedBoard[activeSwap].key, rankedBoard[activeSwap + 1].key] = [rankedBoard[activeSwap + 1].key, rankedBoard[activeSwap].key];
  [rankedBoard[activeSwap].ranked, rankedBoard[activeSwap + 1].ranked] = [rankedBoard[activeSwap + 1].ranked, rankedBoard[activeSwap].ranked];
  sortAndUpdateBoard();
}

function checkRankAbility(activeRank){
  if(rankedBoard[activeRank - 1].name !== "empty"){
    reorderRankedTeamsDown( activeRank);
  }
}

function reorderRankedTeamsDown(activeRank){
  for(var endBlock=activeRank;endBlock<rankedBoard.length;endBlock++){
    if(rankedBoard[endBlock].name === "empty"){
      break;
    }
  }
  if(endBlock === 32){
    reorderRankedTeamsUp(activeRank);
  } else {
    for(let i=endBlock; i>activeRank -1; i--){
      rankedBoard[i].name = rankedBoard[i-1].name;
      rankedBoard[i].key = rankedBoard[i-1].key;
      rankedBoard[i].ranked = true;
    }
  }
}

function reorderRankedTeamsUp(activeRank){
  let startBlock;
  for(startBlock=activeRank - 2; startBlock>0; startBlock--){
    if(rankedBoard[startBlock].name === "empty"){
      break;
    }
  }
  for(let i=startBlock; i<activeRank -1; i++){
    rankedBoard[i].name = rankedBoard[i+1].name;
    rankedBoard[i].key = rankedBoard[i+1].key;
    rankedBoard[i].ranked = true;
  }
}

function sortAndUpdateBoard(){
  unrankedBoard.sort((a,b) => {return a.key > b.key ? 1 : -1});
  rankedBoard.sort((a,b) => {return a.rank > b.rank ? 1 : -1});
  updateRankedBoard();
  updateUnrankedBoard();
}

function getSubmitJSON(){
  for(let i=0;i<rankedBoard.length;i++){
    submitJSON[i] = {
      "name": rankedBoard[i].name,
      "key": rankedBoard[i].key,
      "rank": rankedBoard[i].rank
    }
  }
  console.log(submitJSON);
  document.getElementById("submit-text-area").innerHTML = "Your 2022 NFL team rankings have been logged in the console";
}

class Line {
  constructor(rank, name, key){
    this.rank = rank;
    this.name = name;
    this.ranked = false;
    this.key = key;
  }
}