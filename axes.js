createBestDataAxes = (charData, allHeroesData) => [{
    axis: "Damage",
    value: (charData && charData.best &&
      charData.best.allDamageDoneMostInGame &&
      (charData.best.allDamageDoneMostInGame / allHeroesData.best.allDamageDoneMostInGame) * 10) || 0
  },
  {
    axis: "Eliminations",
    value: (charData && charData.best &&
      charData.best.eliminationsMostInGame &&
      (charData.best.eliminationsMostInGame / allHeroesData.best.eliminationsMostInGame) * 10) || 0
  }, {
    axis: "Healing",
    value: (charData && charData.assists &&
      charData.assists.healingDoneMostInGame &&
      (charData.assists.healingDoneMostInGame / allHeroesData.best.healingDoneMostInGame) * 10) || 0
  },
  {
    axis: "Accuracy",
    value: (charData && charData.best &&
      charData.best.weaponAccuracyBestInGame &&
      charData.best.weaponAccuracyBestInGame.split("%")[0] / 10) || 0
  },
];

createAverageDataAxes = (charData, allHeroesData) => [{
    axis: "Damage",
    value: (charData && charData.best &&
      charData.average.allDamageDoneAvgPer10Min &&
      (charData.average.allDamageDoneAvgPer10Min / allHeroesData.average.allDamageDoneAvgPer10Min) * 10) || 0
  },
  {
    axis: "Eliminations",
    value: (charData && charData.best &&
      charData.average.eliminationsAvgPer10Min &&
      (charData.average.eliminationsAvgPer10Min / allHeroesData.average.eliminationsAvgPer10Min) * 10) || 0
  }, {
    axis: "Healing",
    value: (charData && charData.assists &&
      charData.assists.healingDoneAvgPer10Min &&
      (charData.assists.healingDoneAvgPer10Min / allHeroesData.average.healingDoneAvgPer10Min) * 10) || 0
  },
  {
    axis: "Accuracy",
    value: (charData && charData.best &&
      charData.combat.weaponAccuracy &&
      charData.combat.weaponAccuracy.split("%")[0] / 10) || 0
  },
];
