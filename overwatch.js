//var url = 'https://ow-api.com/v1/stats/pc/us/StBax-2674/complete';

var allHeroesData = data.quickPlayStats.careerStats.allHeroes;
var showingHeroes = {
  best: [],
  average: []
};

function renderRadarChart(container, data) {
  d3.select(container).select("svg").remove();
  if (data.length === 0) return;

  var chart = RadarChart.chart();
  chart.config({
    containerClass: 'radar-chart', // target with css, the default stylesheet targets .radar-chart
    w: 300,
    h: 300,
    maxValue: 10,
    factor: 0.95,
    factorLegend: 1,
    levels: 5,
    radius: 4,
  });
  svg = d3.select(container).append('svg')
    .attr('width', 310)
    .attr('height', 310);
  svg.append('g').classed('focus', 1).datum(data).call(chart);
}

function showData(heroId) {
  if (showingHeroes.best.find(hero => hero.className === heroId)) {
    showingHeroes.best = showingHeroes.best.filter(hero => hero.className !== heroId);
    showingHeroes.average = showingHeroes.average.filter(hero => hero.className !== heroId);
    $("#" + heroId).removeClass("selected");
  } else {
    showingHeroes.best.push({
      className: heroId,
      axes: createBestDataAxes(data.quickPlayStats.careerStats[heroId], allHeroesData)
    });
    showingHeroes.average.push({
      className: heroId,
      axes: createAverageDataAxes(data.quickPlayStats.careerStats[heroId], allHeroesData)
    });
    $("#" + heroId).addClass("selected");
  }
  renderRadarChart("#best-stats", showingHeroes.best);
}

$(document).ready(() => {
  heroes.forEach(hero => {
    $(".hero-list").append('<img class="hero" id="' + hero.id + '" src="' + hero.img + '"/>');
    $("#" + hero.id).click(() => showData(hero.id));
  });

})

/*


// set the dimensions and margins of the graph
var margin = {
    top: 10,
    right: 30,
    bottom: 20,
    left: 50
  },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svgGame = d3.select("#game-stats")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function(d) {
      return (d.group)
    }).keys()

    // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 60])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#e41a1c', '#377eb8', '#4daf4a'])

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
      .keys(subgroups)
      (data)

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter().append("g")
      .attr("fill", function(d) {
        return color(d.key);
      })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) {
        return d;
      })
      .enter().append("rect")
      .attr("x", function(d) {
        return x(d.data.group);
      })
      .attr("y", function(d) {
        return y(d[1]);
      })
      .attr("height", function(d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", x.bandwidth())
  })
  */
