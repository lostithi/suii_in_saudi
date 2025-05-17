export function drawStackedBarChart({
  svgSelector,
  data,
  colors, 
  width = 800,
  height = 600,
  margin = { top: 60, right: 120, bottom: 60, left: 60 }
}) {
  d3.select(svgSelector).selectAll("*").remove();

  const years = Array.from(new Set(data.map(d => d.year))).sort();
  const countries = Array.from(new Set(data.map(d => d.country)));

  const stackedData = years.map(year => {
    const obj = { year };
    countries.forEach(c => {
      const entry = data.find(d => d.year === year && d.country === c);
      obj[c] = entry ? entry.sites : 0;
    });
    return obj;
  });

  const keys = countries;

  const svg = d3.select(svgSelector)
    .attr("width", width)
    .attr("height", height);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(years)
    .range([0, chartWidth])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(stackedData, d => d3.sum(keys, k => d[k]))])
    .nice()
    .range([chartHeight, 0]);

  g.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("font-size", 14);

  g.append("g")
    .call(d3.axisLeft(y).ticks(null, "s"))
    .selectAll("text")
    .attr("font-size", 14);

  g.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickSize(-chartWidth).tickFormat(""))
    .attr("stroke-opacity", 0.1);

  const stackGenerator = d3.stack().keys(keys);
  const series = stackGenerator(stackedData);

  const layers = g.selectAll(".layer")
    .data(series)
    .enter().append("g")
    .attr("class", d => `layer layer-${d.key}`)
    .attr("fill", d => colors[d.key] || "#ccc");

  layers.selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("x", d => x(d.data.year))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());

  layers.selectAll("text")
    .data(d => d)
    .enter().append("text")
    .attr("x", d => x(d.data.year) + x.bandwidth() / 2)
    .attr("y", d => y(d[1]) + (y(d[0]) - y(d[1])) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", 12)
    .text(d => (d[1] - d[0]) > 5 ? (d[1] - d[0]) : "");

  stackedData.forEach(d => {
    const total = d3.sum(keys, k => d[k]);
    g.append("text")
      .attr("x", x(d.year) + x.bandwidth() / 2)
      .attr("y", y(total) - 8)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .attr("font-size", 14)
      .text(total);
  });

  const lastYear = stackedData[stackedData.length - 1];
  let offset = 0;
  keys.forEach(key => {
    const val = lastYear[key];
    if (val > 0) {
      const yPos = y(offset + val / 2);
      g.append("text")
        .attr("x", chartWidth + 10)
        .attr("y", yPos)
        .attr("fill", colors[key] || "#000")
        .attr("font-size", 14)
        .attr("alignment-baseline", "middle")
        .text(key);
      offset += val;
    }
  });

  svg.selectAll(".domain").remove();
}
