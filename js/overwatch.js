//var url = 'https://ow-api.com/v1/stats/pc/us/StBax-2674/complete';

var allHeroesData = null;
var isQuickPlay = true;
var heroLimitCount = 4;
var showingHeroes = {
  ids: [],
  best: [],
  average: [],
  loadHero: heroId => {
    showingHeroes.ids.push(heroId);
    showingHeroes.best.push({
      className: heroId,
      axes: createBestDataAxes(extractHeroBestStats(extractHeroDataById(apiData, heroId, isQuickPlay)), allHeroesData.best)
    });
    showingHeroes.average.push({
      className: heroId,
      axes: createAverageDataAxes(extractHeroAverageStats(extractHeroDataById(apiData, heroId, isQuickPlay)), allHeroesData.bestAverage)
    });
  },
  removeHero: heroId => {
    showingHeroes.ids = showingHeroes.ids.filter(id => id !== heroId);
    showingHeroes.best = showingHeroes.best.filter(hero => hero.className !== heroId);
    showingHeroes.average = showingHeroes.average.filter(hero => hero.className !== heroId);
  }
};

function showData(heroId) {
  if (allHeroesData == null) return;

  if (showingHeroes.ids.find(id => id === heroId)) {
    showingHeroes.removeHero(heroId);
    $("#" + heroId).removeClass("selected");
  } else {
    if (showingHeroes.best.length > heroLimitCount) {
      return;
    }
    showingHeroes.loadHero(heroId);
    $("#" + heroId).addClass("selected");
  }
  renderRadarChart("#best-stats", showingHeroes.best, showingHeroes.ids);
  renderRadarChart("#average-stats", showingHeroes.average, showingHeroes.ids);
  //renderBarPlot("#game-stats", [])
}

$(document).ready(() => {
  // Load player data.
  $(".player-icon-name").append('<img class="player-icon" src="' + extractIcon(apiData) + '"/>');
  $(".player-icon-name").append('<h2 class="player-name">' + extractPlayerName(apiData) + '<h2/>');
  $(".time-played-container").append('<h1 class="time-data">' + extractTimePlayed(apiData, isQuickPlay) + '<h1/>');
  // Load the hero list images.
  heroList.forEach(hero => {
    $(".hero-list").append('<div class="hero" id="' + hero.id + '"><img class="hero-img"  src="' + hero.img + '"/><span class="hero-tag">' + hero.id + '</span></div>');
    $("#" + hero.id).click(() => showData(hero.id));
  });
  // Load the reference data.
  allHeroesData = {
    best: extractAllHeroesBestStats(extractAllHeroesData(apiData, isQuickPlay)),
    bestAverage: extractAllHeroesBestAverageStats(apiData, heroList, isQuickPlay)
  }

})
