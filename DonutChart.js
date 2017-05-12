// Donut Chart
// https://bl.ocks.org/mbostock/3887235

function donutChart() {

    // Set default values
    var width = 600, 
        height = 600, 
        margin = {top: 150, right:30, bottom:30, left:30}, // Not accessible
        color = d3.scaleOrdinal(d3.schemeCategory20c),
        padAngle = 0,
        cornerRadius = 0,
        title,
        tooltipSize = '1.5em',
        showLabels = false // Boolean for labels
    ;
        
        // Function returned by chart
        function chart(selection) {
            
            // Chart dimension variables
            var chartWidth = (width - margin.left - margin.right);
            var chartHeight = (height - margin.top - margin.bottom);

            // Radius variable
            var radius = Math.min(chartWidth, chartHeight)/2;

            // Create pie generator
            // Returns value or 0 (if data is missing)
            var pie = d3.pie()
                .value(function(d) { return +d.sliceVal || 0; })
                .sort(null)
            ;
            
            // Create arc generator for slices
            var arc = d3.arc()
                .outerRadius(radius)
                .innerRadius(radius - 50)
                .cornerRadius(cornerRadius)
                .padAngle(padAngle)
            ;
            
            // Create arc generator for labels
            var label = d3.arc()
                .outerRadius(radius + 10)
                .innerRadius(radius + 10)
            ;

            // Iterate through selections
            selection.each(function(data) {

                // Append svg through data-join if necessary
                var ele = d3.select(this);
                var svg = ele.selectAll('svg').data([data]);                

                // Append svg and set dimensions
                var svgEnter = svg.enter()
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                ;

                // Append chart title to svg
                svgEnter.append('text')
                    .attr('transform', 'translate(' + ((width - margin.left)/2) + ',' + 30 + ')')
                    .attr('class', 'chart-title')
                    .style('font-size', '1.2em')
                ;

                // Append g to svg
                svgEnter.append('g')
                    .attr('transform', 'translate(' + width/2 + "," + height/2 + ')')
                    .attr('class', 'chart-g')
                ;

                // Append tooltip text and style
                // http://bl.ocks.org/nnattawat/9368297
                svgEnter.append('text')
                    .attr('class', 'tooltip')
                    .attr('transform', 'translate(' + (width)/2 + ',' + height/2 + ')')
                    .style('text-anchor', 'middle')
                    .attr('font-weight', 'bold')
                    .style('font-size', tooltipSize)
                ;
        

                // Function to calculate angle for text
                var getAngle = function (d) {
                    return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
                };

                // Paths data-join
                var path = ele.select('.chart-g').selectAll('path')
                    .data(pie(data));
                
                // Enter paths
                path.enter()
                    .append('path')
                    .attr("id", "path1")
                    .attr('d', arc)
                    .attr('fill', function(d) {return color(d.data.sliceCat); })
                    .each(function(d) { this._current = d; })
                    .on('mouseover', function(d) {
                        ele.select('.tooltip') 
                            .html(d.data.sliceCat + ': <tspan x="0" dy="1.2em">' + d.data.sliceVal + '</tspan')
                            .style('display', 'block')
                            .attr('fill', color(d.data.sliceCat))  
                        ;
                    })
                    .on('mouseout', function() {
                        ele.select('.tooltip').style('display', 'none');
                    })
                    .transition()
                    .ease(d3.easeLinear)
                    .duration(1000)
                    .attrTween('d', loadTween)
                ;
                
                // Update paths
                path.transition().duration(750)
                    .attrTween('d', arcTween)
                ;

                // Exit paths
                path.exit().remove();

                // Labels data-join
                var labelText = ele.select('.chart-g').selectAll('.label-text').data(pie(data));
                
                // Enter and update labels
                labelText.enter().append('text')
                    .attr('class', 'label-text').attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ") " + "rotate(" + getAngle(d) + ")"; 
                    }) 
                    .attr('dy', '5')
                    .merge(labelText)
                    .transition().duration(750)
                    .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ") " + "rotate(" + getAngle(d) + ")"; 
                    }) 
                    .attr('dy', '5')
                ;
                

                // Exit labels
                labelText.exit().remove();

                // Function for update animation
                // http://www.cagrimmett.com/til/2016/08/27/d3-transitions.html
                function arcTween(a) {
                    this._current = this._current || a;
			        var i = d3.interpolate(this._current, a);
			        this._current = i(0);
			            return function(t) {
			                return arc(i(t));
			        };
			    };  

                // Function for enter animation
                // http://javascript.tutorialhorizon.com/2015/03/05/creating-an-animated-ring-or-pie-chart-in-d3js/
                function loadTween(b){
                    b.innerRadius = 0;
                    var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
                    return function(t){
                        return arc(i(t));
                    };
			    };

                // Update chart title
                ele.select('.chart-title').text(title);

                // Update showLabels
                if(!showLabels) {
                    ele.selectAll('.label-text').text('');
                } 
                else {
                    ele.selectAll('.label-text').text(function(d) { return d.data.sliceCat; });
                };

            });
        };

    // Width accessor
    chart.width = function(value) {
        if(!arguments.length) {return width;}
        width = value;
        return chart;
    };

    // Height accessor
    chart.height = function(value) {
        if(!arguments.length) {return height};
        height = value;
        return chart; 
    };

    // Chart title accessor
    chart.title = function(value) {
        if(!arguments.length) {return title;}
        title = value;
        return chart;
    };

    // Color accessor
    chart.color = function(value) {
        if(!arguments.length) {return color;}
        color = value;
        return chart;
    };

    // Pad angle accessor
    chart.padAngle = function(value) {
        if(!arguments.length) {return padAngle;}
        padAngle = value;
        return chart;
    };
    
    // Corner radius accessor
    chart.cornerRadius = function(value) {
        if(!arguments.length) {return cornerRadius;}
        cornerRadius = value;
        return chart;
    }

    // Tooltip font-size accessor
    chart.tooltipSize = function(value) {
        if(!arguments.length) {return tooltipSize;}
        tooltipSize = value;
        return chart;
    }

    // Show labels accessor
    chart.showLabels = function(value) {
        if(!arguments.length) {return showLabels;}
        showLabels = value;
        return chart;
    }

    return chart;
};
