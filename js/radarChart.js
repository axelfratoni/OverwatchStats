function renderRadarChart(container, data, legends) {
  //var legends = ["Junk", "Soldier", "Zennyata", "Simmetra", "Roadhog"];
  var w = 400;
  var h = 400;
  var colorscale = d3.scale.category10();

  d3.select(container).select("svg").remove();
  if (data.length === 0) return;

  var chart = RadarChart.chart();
  chart.config({
    containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
    w: w,
    h: h,
    maxValue: 10,
    factor: 0.95,
    factorLegend: 1,
    levels: 5,
    radius: 4,
  });
  var svg = d3.select(container).append('svg')
    .attr("width", w)
    .attr("height", h + 200)
  svg.append('g').classed('focus', 1).datum(data).call(chart);

  //Initiate Legend
  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("height", 100)
    .attr("width", 200)
    .attr('transform', 'translate(-10,10)');
  //Create colour squares
  legend.selectAll('rect')
    .data(legends)
    .enter()
    .append("rect")
    .attr("x", w - 65)
    .attr("y", function(d, i) {
      return i * 20;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(d, i) {
      return colorscale(i);;
    });
  //Create text next to squares
  legend.selectAll('text')
    .data(legends)
    .enter()
    .append("text")
    .attr("x", w - 52)
    .attr("y", function(d, i) {
      return i * 20 + 9;
    })
    .attr("font-size", "14px")
    .attr("font-family", "OverwatchFontOblique")
    .attr("letter-spacing", "0.6")
    .attr("fill", "#737373")
    .text(function(d) {
      return d;
    });
}

function createBestDataAxes(heroBestData, allHeroesBestData) {
  return [{
      axis: "Damage",
      value: (heroBestData.damage / allHeroesBestData.damage) * 10
    },
    {
      axis: "Eliminations",
      value: (heroBestData.eliminations / allHeroesBestData.eliminations) * 10
    }, {
      axis: "Healing",
      value: (heroBestData.healing / allHeroesBestData.healing) * 10
    },
    {
      axis: "Accuracy",
      value: heroBestData.accuracy
    },
  ];
}

function createAverageDataAxes(heroData, allHeroesData) {
  return [{
      axis: "Damage",
      value: (heroData.damage / allHeroesData.damage) * 10
    },
    {
      axis: "Eliminations",
      value: (heroData.eliminations / allHeroesData.eliminations) * 10
    }, {
      axis: "Healing",
      value: (heroData.healing / allHeroesData.healing) * 10
    },
    {
      axis: "Accuracy",
      value: heroData.accuracy
    },
  ];
}
