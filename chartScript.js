var ctx = $("#myDoughnutChart").get(0).getContext("2d");
var ctx2 = $("#myLineChart").get(0).getContext("2d");

var addData = function(){
  var result = 0;
  for( var arg = 0; arg < arguments.length; arg++ ){
    var eacharg = arguments[arg];
    if( Array.isArray(eacharg) ){
      for( var i = 0; i < eacharg.length; i++ ){
        result += eacharg[i];
      }      
    } else {
      result += eacharg;
    }
  }
  return result;
};

var allRecycleData = addData(recycleData);
var allCompostData = addData(compostData);
var allTrashData = addData(landfillData);
var allData = addData(allRecycleData, allCompostData, allTrashData);
var score = Math.round( (allData - allTrashData) / allData * 100);

var doughData = [
    {
        value: allRecycleData,
        color:"rgba(53,118,240,1)", //53, 118, 240
        highlight: "rgba(151,187,205,1)",
        label: "Recycle"
    },
    {
        value: allCompostData,
        color: "rgba(66,199,66,1)",
        highlight: "rgba(151,205,151,1)",
        label: "Compost"
    },
    {
        value: allTrashData,
        color: "rgba(200,200,210,1)",
        highlight: "rgba(220,220,220,1)",
        label: "Trash"
    }
];

var doughOptions = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 5,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 73, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 50,

    //String - Animation easing effect
    animationEasing : "swing",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};

var lineData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
        {
            label: "Recycle",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: recycleData
        },
        {
            label: "Compost",
            fillColor: "rgba(151,205,151,0.2)",
            strokeColor: "rgba(151,205,151,1)",
            pointColor: "rgba(151,205,151,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,205,151,1)",
            data: compostData
        },
        {
            label: "Landfill",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: landfillData
        }
    ]
};

var lineOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

var myDoughnutChart = new Chart(ctx).Doughnut(doughData,doughOptions);
var myLineChart = new Chart(ctx2).Line(lineData, lineOptions);

setTimeout(function(){
  $('#score').text(score);
  var recyclePer = Math.round( (allRecycleData / allData / recycleGoal) * 100);
  var compostPer = Math.round( (allCompostData / allData / compostGoal) * 100);
  $('.progress-bar-info').attr('style', 'width:' + recyclePer + '%');
  $('.progress-bar-info').text(recyclePer + '%');
  $('.progress-bar-success').attr('style', 'width:' + compostPer + '%');
  $('.progress-bar-success').text(compostPer + '%');

}, 800)



