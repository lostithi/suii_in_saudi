export function drawGaugeChart({
  svgSelector,
  data,         // array of objects: [{country, sites, year, color}, ...]
  width = 600,
  height = 400,
  margin = { top: 60, right: 60, bottom: 60, left: 60 },
}) {
  // Clear previous
  d3.select(svgSelector).selectAll("*").remove();

  const svg = d3.select(svgSelector)
    .attr("width", width)
    .attr("height", height);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Center for polar plot (bottom center for semicircle)
  const cx = chartWidth / 2 + margin.left;
  const cy = chartHeight + margin.top;

  const g = svg.append("g").attr("transform", `translate(${cx},${cy})`);

  const nrBars = data.length;

  // Angle scale: map index [0, nrBars-1] to [0, Math.PI]
  const angleScale = d3.scaleLinear()
    .domain([0, nrBars - 1])
    .range([0, Math.PI]);

  // Radius scale for bars length (adjust domain & range as per your data)
  const maxSites = d3.max(data, d => d.sites);
  const radiusScale = d3.scaleLinear()
    .domain([0, maxSites])
    .range([20, 100]);

  // Bar thickness
  const barThickness = 10;

  // Draw background bars (gray arcs)
  g.selectAll("path.bgbar")
    .data(data)
    .join("path")
    .attr("class", "bgbar")
    .attr("fill", "#ddd")
    .attr("stroke", "none")
    .attr("d", (d, i) => {
      const startAngle = angleScale(i);
      const endAngle = angleScale(i + 1) || Math.PI;
      const innerRadius = 20;
      const outerRadius = innerRadius + barThickness;

      const arcGen = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);

      return arcGen();
    });

  // Draw colored bars for data sites
  g.selectAll("path.bar")
    .data(data)
    .join("path")
    .attr("class", "bar")
    .attr("fill", d => d.color || "#69b3a2")
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("d", (d, i) => {
      const startAngle = angleScale(i);
      const barLength = radiusScale(d.sites);
      const endAngle = angleScale(i + 1) || Math.PI;

      const arcGen = d3.arc()
        .innerRadius(20)
        .outerRadius(barLength)
        .startAngle(startAngle)
        .endAngle(endAngle);

      return arcGen();
    });

  // Draw circles (bubbles) at the tip of each bar
  g.selectAll("circle.bubble")
    .data(data)
    .join("circle")
    .attr("class", "bubble")
    .attr("r", 12)
    .attr("fill", d => d.color || "#69b3a2")
    .attr("cx", (d, i) => {
      const angle = (angleScale(i) + angleScale(i + 1)) / 2 || Math.PI / 2;
      const r = radiusScale(d.sites);
      return Math.cos(angle - Math.PI / 2) * r;
    })
    .attr("cy", (d, i) => {
      const angle = (angleScale(i) + angleScale(i + 1)) / 2 || Math.PI / 2;
      const r = radiusScale(d.sites);
      return Math.sin(angle - Math.PI / 2) * r;
    });

  // Add text inside bubbles (e.g. year labels)
  g.selectAll("text.bubble-label")
    .data(data)
    .join("text")
    .attr("class", "bubble-label")
    .attr("fill", "white")
    .attr("font-weight", "bold")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("x", (d, i) => {
      const angle = (angleScale(i) + angleScale(i + 1)) / 2 || Math.PI / 2;
      const r = radiusScale(d.sites);
      return Math.cos(angle - Math.PI / 2) * r;
    })
    .attr("y", (d, i) => {
      const angle = (angleScale(i) + angleScale(i + 1)) / 2 || Math.PI / 2;
      const r = radiusScale(d.sites);
      return Math.sin(angle - Math.PI / 2) * r;
    })
    .text(d => d.year_lbl);

  // Add axis labels below the semicircle (every 5 steps)
  const axisLabels = [0, 5, 10, 15, 20, 25];
  const axisAngles = axisLabels.map(v => (v / 25) * Math.PI);

  g.selectAll("text.axis-label")
    .data(axisLabels)
    .join("text")
    .attr("class", "axis-label")
    .attr("font-size", 12)
    .attr("fill", "#555")
    .attr("text-anchor", "middle")
    .attr("x", d => Math.cos(axisAngles[axisLabels.indexOf(d)] - Math.PI / 2) * (20 - 15))
    .attr("y", d => Math.sin(axisAngles[axisLabels.indexOf(d)] - Math.PI / 2) * (20 - 15))
    .text(d => d);

  // Optional: Add center title text
  svg.append("text")
    .attr("x", cx)
    .attr("y", cy + 30)
    .attr("text-anchor", "middle")
    .attr("font-size", 16)
    .text("World Heritage Sites");
}
