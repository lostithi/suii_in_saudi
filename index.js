// SELECTION AND MANIPULATION===================

// d3.select("h1")
//     .text("hi da")
//     .style("color","red")
//     .attr("class","heading")
//     .text("Updated h1 tag")

//     d3.select('body').append('p').text('First Paragraph')
//     d3.select('body').append('p').text('Second Paragraph')
//     d3.select('body').append('p').text('Third Paragraph')
//     d3.selectAll('p').style('color','blue');

// DATA LOADING AND BINDING=========================

// var data1=[1,2,3,4,5];
// d3.select('body')
//     .selectAll('p')
//     .data(data1)
//     .enter()
//     .append('p')
//     .text("D3 is guud")
//     .text(function(d){
//         return d;
//     });

// SIMPLE BARCHART=====================================

var dataset = [80,100,56,120,180,30,40,120,160];

var svgWidth = 500,svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width",svgWidth)
    .attr("height",svgHeight)

var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y",function(d){
        return svgHeight - d
    })
    .attr("height", function(d){
        return d;
    })
    .attr("width",barWidth - barPadding)
    .attr("transform",fundtion(d,i){
        var translate = [barWidth = i,0];
        return "translate("+translate +")";
    });