function extractPlayerName(apiData) {
  return apiData.name;
}

function extractIcon(apiData) {
  return apiData.icon;
}

function extractTimePlayed(apiData, isQuickPlay) {
  if (isQuickPlay) {
    return apiData.quickPlayStats.careerStats.allHeroes.game.timePlayed;
  } else {
    return apiData.competitiveStats.careerStats.allHeroes.game.timePlayed;
  }
}

function extractAllHeroesData(apiData, isQuickPlay) {
  if (isQuickPlay) {
    return apiData.quickPlayStats.careerStats.allHeroes;
  } else {
    return apiData.competitiveStats.careerStats.allHeroes;
  }
}

function extractHeroDataById(apiData, heroId, isQuickPlay) {
  if (isQuickPlay) {
    return apiData.quickPlayStats.careerStats[heroId];
  } else {
    return apiData.competitiveStats.careerStats[heroId]
  }
}

function extractHeroBestStats(heroData) {
  return {
    damage: (heroData && heroData.best && heroData.best.allDamageDoneMostInGame) || 0,
    eliminations: (heroData && heroData.best && heroData.best.eliminationsMostInGame) || 0,
    healing: (heroData && heroData.assists && heroData.assists.healingDoneMostInGame) || 0,
    accuracy: (heroData && heroData.best && heroData.best.weaponAccuracyBestInGame && heroData.best.weaponAccuracyBestInGame.split("%")[0] / 10) || 0,
  }
}

function extractHeroAverageStats(heroData) {
  return {
    damage: (heroData && heroData.average && heroData.average.allDamageDoneAvgPer10Min) || 0,
    eliminations: (heroData && heroData.average && heroData.average.eliminationsAvgPer10Min) || 0,
    healing: (heroData && heroData.assists && heroData.assists.healingDoneAvgPer10Min) || 0,
    accuracy: (heroData && heroData.combat && heroData.combat.weaponAccuracy && heroData.combat.weaponAccuracy.split("%")[0] / 10) || 0,
  }
}

function extractAllHeroesBestStats(allHeroesData) {
  return {
    damage: (allHeroesData && allHeroesData.best && allHeroesData.best.allDamageDoneMostInGame) || 0,
    eliminations: (allHeroesData && allHeroesData.best && allHeroesData.best.eliminationsMostInGame) || 0,
    healing: (allHeroesData && allHeroesData.best && allHeroesData.best.healingDoneMostInGame) || 0
  }
}

function extractAllHeroesBestAverageStats(apiData, heroList, isQuickPlay) {
  var bestAverage = {
    damage: 0,
    eliminations: 0,
    healing: 0
  };
  heroList.forEach(hero => {
    var heroAverageStats = extractHeroAverageStats(extractHeroDataById(apiData, hero.id, isQuickPlay));
    bestAverage = {
      damage: Math.max(heroAverageStats.damage, bestAverage.damage),
      eliminations: Math.max(heroAverageStats.eliminations, bestAverage.eliminations),
      healing: Math.max(heroAverageStats.healing, bestAverage.healing)
    };
  });
  return bestAverage;
}
