import React, {useEffect, useState} from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import {message} from "antd";
import {getUserSignInRecordFinal} from "@/api/user";

const Page: React.FC = () => {
  // 签到日期列表（[1, 200]，表示第 1 和第 200 天有签到记录）
  const [dataList, setDataList] = useState<number[]>([]);

  // 计算图表需要的数据
  const year = new Date().getFullYear();
  const optionsData = dataList.map((dayOfYear, index) => {
    // 计算日期字符串
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });

  // 请求后端获取数据
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInRecordFinal({
        year,
      });
      setDataList(res.data.data || []);
    } catch (e:any) {
      message.error("获取刷题签到记录失败，" + e.message);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);



  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["rgba(233,233,233)", "#95de64"],
      },
    },
    calendar: {
      range: year,
      left: "center",
      top:110,
      cellSize: [18,18],
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(0, 0, 0,0.25)",
        },
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: '#fff',
        color: "rgba(240,240,240)",
        borderRadius: 30,
      },
      dayLabel: {
        firstDay: 0,
        fontSize: 12,
        margin: 16,
        color: 'rgb(140,140,140)',
        verticalAlign: 'middle',
      },
      monthLabel: {
        nameMap: 'ZH',
        color: 'rgb(140,140,140)',
        align: 'center',
        margin: 20,
      },
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
        margin:60
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
      itemStyle: {
        borderRadius: 3,
      }
    },
    tooltip: {
      trigger: 'item',
      borderWidth: 0,
      formatter: (params: any) => {
        return `<div><b>${params.value[0]}</b> 签到</div>`
      },
    }
  };

  return <ReactECharts option={options} opts={{renderer: 'svg'}} />;
};

export default Page;
