# a3-software-design | Donut Chart

DonutChart.js uses the D3 JavaScript library to render a **donut chart**. The donut chart is best fit for smaller datasets to effectively visualize the composition of the data.

## Getting Started

### Setup

In the  `<head>`  of your html file, include the following:

```html
<!-- D3 Libray -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.4/d3.js"></script>

<!-- Donut Chart script file -->
<script src="DonutChart.js"></script>
```

### Data Prep

*DonutChart.js* uses mapped datasets or arrays to display data. 

The datasets used for DonutChart.js may look something like this:

```
age, population, family, count
<5, 2704659, a, 1
5-13, 4499890, b, 1
14-17, 2159981, c, 2
18-24, 3853788, d, 2
25-44, 14106543, e, 1
45-64, 8819342, f, 1
≥65, 612463, g, 2
```

To prepare the data, load in your data and use the following method:

```js
var prepData = function() {
    chartData = data.map(function(d) {
        return {
            // Value is a data variable used to determine the size of the slices
            sliceVal: d[value],

            // Category is a data variable used to determine the number of slices
            sliceCat: d[category],
        };
    });
};

prepData();
```

### Initialize, Draw, Update

To get started on rendering the chart, use the following approach:

```js
// Set chart parameters using methods
var myChart = donutChart().param1(value1).param2(value2);

// Initialize and draw
var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) 
                .call(myChart); 
```

To update the data or parameters, use:

```js
// Update a chart parameter and the data (on some event handler)
myChart.param1(newValue);
chartWrapper.datum([newDataSet]).call(myChart);
```

## API Reference

#### .width(*int*)

Sets the *width* of the svg. The default width is 600.
If the parameter of `.width()` is not specified, returns width.

#### .height(*int*)

Sets the *height* of the svg. The default height is 600.
If the parameter of `.height()` is not specified, returns height.

#### .title(*string*)

Sets the *title* of the donut chart. The title is undefined and will not show if method is not called with a value.
If the parameter of `.title()` is not specified, returns title.

#### .color(*Array[string]*)

Sets the *color array* for the colors of the slices. Default color is `d3.schemeCategory20c`.
If the parameter of `.color()` is not specified, returns color array.

#### .padAngle(*int*)

Sets the *pad angle* of chart slices. The default pad angle is 0.
If the parameter of `.padAngle()` is not specified, returns pad angle.

#### .cornerRadius(*int*)

Sets the *corner radius* of chart slices.  Defualt corner radius is 0.
If the parameter of `.cornerRadius()` is not specified, returns corner radius.

If the corner radius is greater than zero, the corners of the arc are rounded using circles of the
given radius.

#### .tooltipSize(*string*)

Sets the *font size* of the tooltip text. Default size is `1.5em`.
If the parameter of `.tooltipSize()` is not specified, returns tooltip font size.

If the tooltip size is 0, the tooltip text will not display.

#### .showLabels(*boolean*)

If *false*, the labels of the slices are not shown. Default show labels is true.
If the parameter of `.showLabels()` is not specified, returns boolean.

