"use strict"; // to prevent us from overwriting important variables
const c = "constant"; // a constant value, assignment to c is no longer allowed
let v = "variable"; // a primitive variable
let a = [1, 2, 3, false]; // an array
let o = {
  an object
  key1: 1,
  key2: "something",
};
console.log(c);
console.log(v);
console.log(a);
console.log(o);
console.log(o["key1"]); //COULD HELP
console.log(o.key2); //COULD HELP

//FUNCTIONS-----------------------------------

function one(a, b) {
  return a + b;
}
let two = function (a, b) {
  return a + b;
};
let three = (a, b) => a + b;

//MODULES-----------------------------------

export function GCD(a, b) {
  if (b === 0) return a;
  return GCD(b, a % b);
}
export function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

// D3=========================================================================================

// d3.select =>selects a DOM =>Anything in an HTML file within tags. <BODY> <DIV> <SPAN> etc

// ACCESSING AND MANIPULATION:
EG1
d3.select("body")
    .append("p")
    .text("Hello D3!")

EG2
const data = ["10,20,30,50"];
d3.select("body")   //SELECTS DOM
    .selectAll("div")   //DOESNTEXIST RN
    .data("data")   //LINK ARRAY TO BODY
    .enter()    //CREATES NEW <div> ELEMENTS FOR EACH PIECE OF DATA
    .append("div")      //NEW <div> ADDED TON BODY
    .text(d=>'value: ${d}')     //DISPLAYS EACH VALUE INSIDE EACH DIV
    .style("height",d=>'${d}px');   //DYNAMICALLY SETS HEIGHT OF <divs>

// MANIPULATIONS

EG3 
d3.selectAll("p")
    .data(["one","two","three"])
    .text(d=d)
    .style("color","orange");

//EVENT HANDLING

EG4
d3.select("button")
    .on("click",function(){
        alert("Buttons clicked");
    });

//ACCESSOR FUNCTION=>(d,i)=>(datum,index)
d3.selectAll("p")
    .text(d=>d)     //Simply takes data(d-any value)and returns it,which will be text content og ecah corresponding <p> element.


// SVG(Scalable VEctor Graphics)=>VEctor based Graphics;=====>SCALABLE(Advantage)

// SVG elements are:
//             <rect></rect>
//             <circle></circle>
//             <line></line>
//             <path></path>
//             <text></text>

// CReating a container:
    // Before adding individual SVG container=>Create SVG contaoner on Page =>by appending<SVG>

EG1=BASIC
const svg = d3.select("body")
    .attr("height",500)
    .attr("width",500)

EG2=ADD RECTANGLE
svg.append("rect")
    .attr("x",50)
    .attr("y",50)
    .attr("width",200)
    .attr("height",100)
CREATES A RECTANGLE (50,50)


EG3=ADD CIRCLE
svg.append("Circle")
    .attr("cx",50)
    .attr("cy",50)
    .attr("r",50)

EG4=LINE
svg.append("Circle")
    .attr("x1",50)
    .attr("y2",50)
    .attr("x2",500)
    .attr("y2",500)



EG5=TEXT
svg.append("text")
    .attr("x",50)
    .attr("y",50)
    .text("Hello")
    .style("font-size","20px")

    // ============================================================
IMPORTANT
    // ============================================================

EG6=BARCHART()
const data1=[];
svg.selectAll("rect")
    .data(data1)
    enter()
    .append("rect")
    .attr("x", "y", "width", "height");



SELCTION METHODS IN d3

const svg1 = d3.select()
    .selectAll()
    .text()
    .data()
    .enter()
    .append()
    .style()

STEPS FOR D3 (initial)  {REFER}

1)DIV
2)SVG
3)Appending elements and groups
4)Binding data
5)Join() for each elements{Adding}
6)Classed()-{Styling}











