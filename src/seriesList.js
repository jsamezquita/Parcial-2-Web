import React, { useState, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import * as d3 from "d3";
import Serie from "./serie";

export default function SeriesList() {
  const intl = useIntl();
  let url = "";
  const lang = navigator.language;
  const [series, setSeries] = useState([]);

  if (lang.slice(0, 2) == "es") {
    url =
      "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
  }
  if (lang.slice(0, 2) == "en") {
    url =
      "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";
  }
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((content) => {
        setSeries(content);
      });
  }, []);

  const Graph = () => {
      const drawChart = () =>{

        const canvas = d3.select("#canvas");
        canvas.append('h3').text("Seasons")

        const svg = canvas.append("svg");
        
        const width = 1000;
        const height = 600;
        
        const margin = { top:100, left:200, bottom: 40, right:10}
        
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;
        
        const y = d3.scaleLinear() 
            .domain([0, 13])
            .range([iheight, 0]);
        
        const x = d3.scaleBand()
        .domain(series.map(d => d.name) ) 
        .range([0, iwidth])
        .padding(0.1); 
        
        svg.attr("width",width);
        svg.attr("height",height);
        
        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        
        const bars = g.selectAll("rect").data(series);
        
        
        bars.enter().append("rect")
        .attr("class", "bar")
        .style("fill", "orange")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.seasons))
        .attr("height", d => iheight - y(d.seasons))
        .attr("width", x.bandwidth())  
        
        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  
        
        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
      
      };
      drawChart();
  }

  return (
    <div>
      <div class="col-12">
      <table className="table">
        <thead className={"thead-" + intl.formatMessage({ id: "theme" })}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <FormattedMessage id="name" />
            </th>
            <th scope="col">
              <FormattedMessage id="channel" />
            </th>
            <th scope="col">
              <FormattedMessage id="description" />
            </th>
          </tr>
        </thead>
        <tbody>
          {series.map((e, i) => (
            <Serie key={i} id={i} serie={e} />
          ))}
        </tbody>
      </table>
      <div id="canvas"/>
      {Graph()}
    </div>
    </div>
  );
}
