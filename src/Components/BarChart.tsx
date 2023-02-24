import ReactEcharts from "echarts-for-react"; 
import { AllData } from  "./Data"

interface AvgData {
  [key: string]: {
    totalMalicAcid: number;
    numSamples: number;
  };
}

export const BarChart: React.FC = () => {
  const avgData: AvgData = {};

  for (let item of AllData) {
    const className = item.Alcohol;

    if (!avgData[className]) {
      avgData[className] = {
        totalMalicAcid: 0,
        numSamples: 0,
      };
    }

    avgData[className].totalMalicAcid += item.MalicAcid;
    avgData[className].numSamples++;
  }

  const malicAcid: number[] = [];
  const alcoholData: string[] = [];
  for (let name in avgData) {
    const avg = avgData[name].totalMalicAcid / avgData[name].numSamples;
    let res = parseFloat(avg.toFixed(2));
    malicAcid.push(res);
    alcoholData.push(name);
  }

  const option = {
    title: {
      text: "Alcohol and Malic Acid Data",
      left: "center",
    },
    visualMap: {
      min: 12,
      max: 14,
      dimension: 1,
      orient: "vertical",
      right: 10,
      top: "center",
      text: ["HIGH", "LOW"],
      calculable: true,
      inRange: {
        color: ["#f2c31a", "#24b7f2"],
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        name: "Alcohol",
        data: alcoholData,
        axisTick: {
          alignWithLabel: true,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Malic Acid",
      },
    ],
    series: [
      {
        name: "Malic Acid",
        type: "bar",
        barWidth: "30%",
        data: malicAcid,
        emphasis: {
          focus: "series",
        },
      },
    ],
  };

  const Style = {
    height: "400px",
    width: "85%",
    padding: "5%",
    paddingRight: "2%",
    margin: "auto",
  };

  return (
    <>
      <ReactEcharts lazyUpdate={true} style={Style} option={option} />
      <h4 style={{ marginTop: '-60px',marginLeft:"40%" }}>Alcohol</h4>
    </>
  );
};