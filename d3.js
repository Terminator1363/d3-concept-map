<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conceptual Map</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    line {
      stroke: #999;
      stroke-width: 2;
    }
    circle {
      fill: #69b3a2;
      stroke: #333;
      stroke-width: 1.5px;
    }
    text {
      font-size: 12px;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <script>
    // Sample data for the conceptual map
    const data = {
      nodes: [
        { id: "Concept A" },
        { id: "Concept B" },
        { id: "Concept C" },
        { id: "Concept D" },
        { id: "Concept E" },
      ],
      links: [
        { source: "Concept A", target: "Concept B" },
        { source: "Concept A", target: "Concept C" },
        { source: "Concept B", target: "Concept D" },
        { source: "Concept C", target: "Concept E" },
      ],
    };

    // SVG dimensions
    const width = 800;
    const height = 600;

    // Create an SVG element
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create a simulation for the force-directed graph
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw links (lines between nodes)
    const link = svg.selectAll("line")
      .data(data.links)
      .enter()
      .append("line");

    // Draw nodes (circles)
    const node = svg.selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

    // Add labels to nodes
    const label = svg.selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text(d => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", -15);

    // Update the graph layout on every tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    // Drag event handlers
    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  </script>
</body>
</html>
