import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function LineChart({chartData}) {



  useEffect(() => {

    am5.addLicense("AM5C384814842");

    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
      })
    );

    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var value = 1;

   
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -70,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 1,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        gridIntervals: [{ timeUnit: "day", count: 1 }],
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    chart.get("colors").set("colors", [
      am5.color(0xA893F0)]);

    // xAxis.get("dateFormats")["day"] = "DD/MM";

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        numberFormat: "#.00'%'",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%",
        }),
      })
    );

    // xAxis.get("dateFormats")["day"] = "DD/MM";
    // Set data
    /* var data = generateDatas(7);
    series.data.setAll(data); */

    series.data.setAll(chartData)
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    return () => {
      root.dispose();
    };
  }, [chartData]);
  

return <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>;
}
export default LineChart;