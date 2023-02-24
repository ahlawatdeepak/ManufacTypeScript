import ReactEcharts from "echarts-for-react";
import { AllData } from "./Data";

// for get all the color Data  
const color= AllData.map((el) => {
    return el.Color_intensity
  });
  
  // for get all the Hue Data
  const Hue: number[] = AllData.map((el) => {
    return el.Hue
  });
  
  export const ScatterChart = () => {
      
      
       // initializes an option object to configure the settings for a Scatter chart.

      //  The Color Data and Hue Data arrays are used to populate the x-axis and y-axis data in the chart.
    const option = {
      title: {
        text: 'Color Intensity and Hue Data',
        left: 'center'
      },
      visualMap: {    // visualMap for Color Range and High Low functionality
        min: .11,
        max: 13,
        dimension: 1,
        orient: 'vertical',
        right: 10,
        top: 'center',
        text: ['HIGH', 'LOW'],
        calculable: true,
        inRange: {
          color: ['#37A2FF', '#FF0087']
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',            // onMouseHover the cross is visible and show the Data
          crossStyle:{
            color:'#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: true },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          name: 'Color intensity',
          data: color,   // pass the color data
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Hue',
        }
      ],
      series: [
        {
          name: 'Hue',
          type: 'scatter',  // give the type which type of chart we want
          data: Hue,  // pass the Hue data
          emphasis: {
            focus: 'series'
          },
          animationDelay: function (idx: number) {  
            return idx * 10;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx: number) {
        return idx * 5;
      }
    };
  
    const Style = {
      height: '400px',
      width: '85%',
      padding: '5%',
      paddingRight: '2%',
      margin: 'auto',
    };
  
    return (
      <>
        <ReactEcharts
          lazyUpdate={true}
          style={Style}
          option={option}
        />
        <h4 style={{ marginTop: '-60px',marginLeft:"40%"}}>Color Intensity</h4>
      </>
    );
  };
  
