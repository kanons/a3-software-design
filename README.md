# a3-software-design

## Donut Chart

DonutChart.js uses the D3 JavaScript library to render a **donut chart**.

## Getting Started

To get started on rendering the chart, use the following approach:

```js
var myChart = donutChart().param1(value1).param2(value2);

var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) 
                .call(myChart); 
```
To update the data or parameters, use:

```js
// Initiation of chart
var chartWrapper = d3.select('#my-div').datum([dataSet]).call(myChart); 

// Update a chart parameter and the data (on some event handler)
myChart.param1(newValue);
chartWrapper.datum([newDataSet]).call(myChart);
```

## API Reference

**.width**(*int*)

Sets the *width* of the svg.
If *width* is not specified, the default width is 600.

**.height**(*int*)

Sets the *height* of the svg.
If *height* is not specified, the default height is 600.

**.sliceVal**(*string*)

Sets the variable used for the *values* of chart slices.
Must be called to successfully render chart.

**.sliceCat**(*string*)

Sets the data variable used for the *slices* of the chart.
Must be called to successfully render chart.

**.title**(*string*)

Sets the *title* of the donut chart.
If *title* is not specified, the default title is empty.

**.color**(*Array[string]*)

Sets the *color array* of the fill of slice paths.
If *color* is not specified, the default color array is *d3.schemeCategory20c*.

**.padAngle**(*int*)

Sets the *pad angle* of chart slices.
If *padAngle* is not specified, the default pad angle is 0.

**.cornerRadius**(*int*)

Sets the *corner radius* of chart slices. 
If *cornerRadius* is not specified, the default corner radius is 0.

If the corner radius is greater than zero, the corners of the arc are rounded using circles of the
given radius.

**.showLabels**(*boolean*)

If *false*, the labels of the slices are not shown. If *true* or not specified, the labels of the slices
are shown.

**.showTooltip**(*boolean*)

If *false*, the tooltip of the chart is not shown. If *true* or not specified, the tooltip of the chart
is shown.

