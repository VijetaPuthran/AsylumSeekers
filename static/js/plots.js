// -----------------------------------
// Male v Female Bar Chart
// -----------------------------------
var dataUrl = "/api/demographics"
d3.csv("/demographics.csv").then((data) => {
})

// // Create function
function build_mfChart() {
  // // -----------------------------------
// // Top 25 Chart Countries Bar Graph
// // -----------------------------------

// Create Function 
// function build_topChart(sample) {

  var dataUrl = "http://127.0.0.1:5000//api/timeseries";

  d3.csv("/timeseries.csv").then((data) => {

    // var top_year = data.map(info => info.year);
    var host = data.map(info => info.host_country);
    var value = data.map(info => info.value);

    // Build Bar Chart
    var barData = [
      {
        y: value,
        x: host.slice(0, 25),
        text: host.slice(0, 25),
        type: "bar",
        // orientation: "h",
      }
    ];

    var barLayout = {
      title: "Top 25 Host Countries for Past 5 Years",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("top_bar", barData, barLayout);
  });
  
}

// // -----------------------------------
// // Male vs Female Bubble Chart
// // -----------------------------------

function buildCharts(sample) {

  // var dataUrl = "http://127.0.0.1:5000/api/demographics";

  
  d3.csv("/demographics.csv").then((data) => {
    var mf_year = data.map(info => info.year);
    var m_total = data.filter(object => object.year == sample).map(info => info.m_total);
    var f_total = data.filter(object => object.year == sample).map(info => info.f_total);
    var country = data.map(info => info.host_country);

    // Build Bar Chart
    var barData = [
      {
        x: m_total,
        y: country,
        text: mf_year,
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "Total Asylum Seekers by Year",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("mf_bar", barData, barLayout);
  });
  
  // var dataUrl = "http://127.0.0.1:5000/api/demographics";

  d3.csv("/demographics.csv").then((data) => {

    // var resultArray = data.results;
    // userInfo = data.user;

    var mf_year = data.map(info => info.year);
    var m_total = data.filter(object => object.year == sample).map(info => info.m_total);
    var f_total = data.filter(object => object.year == sample).map(info => info.f_total);
    var country = data.map(info => info.host_country);

    // Build a Bubble Chart
    var bubbleLayout = {
      title: "Male vs Female",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "Country" },
      yaxis: { title: "Number of People"},
      margin: { t: 30}
    };
    var bubbleData = [
      {
        x: m_total,
        y: country,
        text: country,
        mode: "markers",
        marker: {
          size: m_total  / 1000000,
          // color: m_total,
          //sizeref=2.*max(m_total)/(40.**2),
          colorscale: "Earth"
        }
      //   marker: dict(
      //     size= m_total,
      //     sizemode='area',
      //     sizeref=2.*max(m_total)/(40.**2),
      //     sizemin=4
      // )
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  })
  



}


// // Dropdown function 
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var mf_year;
  d3.csv("/demographics.csv").then((data) => {
    mf_year = data.map(info => info.year);
    buildCharts(mf_year[0]);

    d3.select("#selDataset").selectAll("option")
    .data(d3.map(data, function(d){return d.year;}).keys())    
    .enter()
    .append("option")
    .text(function(d){return d;})
    .attr("value",function(d){return d;})
    .sort(d3.ascending);
  });

  build_mfChart();
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);

}

// // Initialize the dashboard
init();