import Auth from "../utils/auth";
import PostQuote from "../components/PostQuote";
import ShowQuotes from "../components/ShowQuotes";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GET_MY_QUOTES } from "../utils/queries";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";

import { Line } from "react-chartjs-2";


const LineChartData = {
  labels: ['Red', 'Orange', 'Blue', "Yello", "White", "Black"],  
  datasets: [
      {
        label: 'First dataset',
        data: [55, 23, 96, 41, 66, 53],
        fill: false,
        tension: 0.4,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
      {
        label: 'Second dataset',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        tension: 0.4,        
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#742774",
        borderWidth: 2,
      },

  ]
}

const EmotionLineChartData = {
  labels: ['Red', 'Orange', 'Blue', "Yello", "White", "Black"],  
  datasets: [
  ]
}

const EmotionDate = [];
const EmotionColorCode = [
  "#F8D664",  // happy
  "#2a3b90",  // sad
  "#89e777",  // anxious
  "#e72222",   // angry
  "#fe8497",   // stressed
  "#5a6271",   // lonely
  "#A0B593 ",   // overwhelmed
  "#bbdbd1",   // frustrated
  "#493f74",   // disappointed
  "#c6d4c1",   // grateful
  "#a1782f",   // exhausted
  "#9a7963",   // insecure
  "#79f1ed",   // nervous
  "#4a1919",   // hopeless
  "#526757",   // jealous
  "#151928",   // lost
]



const INITIAL_EmotionData = [
  { name: 'Happy', emoji: '😊', emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[0]},
  { name: 'Sad', emoji: '😢' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[1]} ,
  { name: 'Anxious', emoji: '😰' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[2]},
  { name: 'Angry', emoji: '😠' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[3]},
  { name: 'Stressed', emoji: '😥' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[4]},
  { name: 'Lonely', emoji: '🙍‍♂️' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[5]},
  { name: 'Overwhelmed', emoji: '😵' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[6]},
  { name: 'Frustrated', emoji: '😤' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[7]},
  { name: 'Disappointed', emoji: '😞' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[8]},
  { name: 'Grateful', emoji: '🙏' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[9]},
  { name: 'Exhausted', emoji: '😩' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[10]},
  { name: 'Insecure', emoji: '🙇‍♂️' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[11]},
  { name: 'Nervous', emoji: '😟' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[12]},
  { name: 'Hopeless', emoji: '😔' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[13]},
  { name: 'Jealous', emoji: '😒' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[14]},
  { name: 'Lost', emoji: '🤔' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[15]}

]


const EmotionData = [
  { name: 'Happy', emoji: '😊', emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[0]},
  { name: 'Sad', emoji: '😢' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[1]} ,
  { name: 'Anxious', emoji: '😰' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[2]},
  { name: 'Angry', emoji: '😠' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[3]},
  { name: 'Stressed', emoji: '😥' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[4]},
  { name: 'Lonely', emoji: '🙍‍♂️' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[5]},
  { name: 'Overwhelmed', emoji: '😵' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[6]},
  { name: 'Frustrated', emoji: '😤' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[7]},
  { name: 'Disappointed', emoji: '😞' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[8]},
  { name: 'Grateful', emoji: '🙏' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[9]},
  { name: 'Exhausted', emoji: '😩' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[10]},
  { name: 'Insecure', emoji: '🙇‍♂️' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[11]},
  { name: 'Nervous', emoji: '😟' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[12]},
  { name: 'Hopeless', emoji: '😔' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[13]},
  { name: 'Jealous', emoji: '😒' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[14]},
  { name: 'Lost', emoji: '🤔' , emotiondata: [0,0,0,0,0,0,0], color: EmotionColorCode[15]}

]



function updateEmotionData(quoteEmotion, quoteDate)
{
//  console.log("updateEmotionData", quoteEmotion, quoteDate);

  for (let i=0; i<EmotionData.length; i++)
  {
//    console.log(EmotionData[i].name.toLowerCase());

    if (EmotionData[i].name.toLowerCase() === quoteEmotion.toLowerCase())
    {
      EmotionData[i].emotiondata[quoteDate] += 1;
    }
  }

}

function getSevenDayEmotion2(quoteData)
{
  const currentDate = new Date();
  const oneDayBefore = new Date(currentDate.getTime() - 1*24*60*60*1000);
  const twoDayBefore = new Date(currentDate.getTime() - 2*24*60*60*1000);
  const threeDayBefore = new Date(currentDate.getTime() - 3*24*60*60*1000);
  const fourDayBefore = new Date(currentDate.getTime() - 4*24*60*60*1000);  
  const fiveDayBefore = new Date(currentDate.getTime() - 5*24*60*60*1000);    
  const sixDayBefore = new Date(currentDate.getTime() - 6*24*60*60*1000);      
  const sevenDayBefore = new Date(currentDate.getTime() - 7*24*60*60*1000);      

  EmotionDate[0] = sixDayBefore.getMonth() + 1 + "/" + sixDayBefore.getDate();
  EmotionDate[1] = fiveDayBefore.getMonth()+ 1 + "/" + fiveDayBefore.getDate();  
  EmotionDate[2] = fourDayBefore.getMonth()+ 1 + "/" + fourDayBefore.getDate();    
  EmotionDate[3] = threeDayBefore.getMonth() + 1+ "/" + threeDayBefore.getDate();      
  EmotionDate[4] = twoDayBefore.getMonth() + 1+ "/" + twoDayBefore.getDate();      
  EmotionDate[5] = oneDayBefore.getMonth() + 1+ "/" + oneDayBefore.getDate();        
  EmotionDate[6] = currentDate.getMonth() + 1+ "/" + currentDate.getDate();          


  for (let i=0; i<quoteData.length; i++)
  {
    const quote = quoteData[i];  
    const words = quote.createdAt.split(', ');
    const createdDate = words[0];
     const quoteDate = new Date(createdDate);
//     console.log(i, quoteDate);

     if (quoteDate <= sevenDayBefore)
     {
//       console.log("quote.createdAt < sevenDayBefore", quoteDate, sevenDayBefore,i);
     }
     else if (quoteDate.getDate() === sixDayBefore.getDate()){
//      console.log("quoteDate = sixDayBefore",  quoteDate.getDate(), sixDayBefore.getDate(), i);

      updateEmotionData(quote.emotion, 0);
    }
    else if (quoteDate.getDate() === fiveDayBefore.getDate())
    {
//      console.log("quoteDate === fiveDayBefore",  quoteDate.getDate(), fiveDayBefore.getDate(),i);
      updateEmotionData(quote.emotion, 1);      
    }
    else if (quoteDate.getDate() === fourDayBefore.getDate())
    {
//      console.log("quoteDate < fourDayBefore",  quoteDate.getDate(), fourDayBefore.getDate(), i);
      updateEmotionData(quote.emotion, 2);      
    }
    else if (quoteDate.getDate() === threeDayBefore.getDate())
    {
//      console.log("quoteDate < threeDayBefore", quoteDate.getDate(), threeDayBefore.getDate(), i);
      updateEmotionData(quote.emotion, 3);      
    }
    else if (quoteDate.getDate() === twoDayBefore.getDate())
    {
//      console.log("quoteDate < twoDayBefore",  quoteDate.getDate(), twoDayBefore.getDate(), i);
      updateEmotionData(quote.emotion, 4);      
    }
    else if (quoteDate.getDate() === oneDayBefore.getDate())
    {
//      console.log("quoteDate < oneDayBefore", quoteDate.getDate(), oneDayBefore.getDate(), i);
      updateEmotionData(quote.emotion, 5);      
    }
    else if (quoteDate.getDate() === currentDate.getDate())
    {
//      console.log("quoteDate = currentDate", quoteDate.getDate(), currentDate.getDate(), i);
      updateEmotionData(quote.emotion, 6);      
    } 
  }
}

function trimEmptyData()
{
  for (let i=0; i<EmotionData.length; i++)
  {
      const arr = EmotionData[i].emotiondata;

      const isAllZero = arr.every(element => element === 0);

      if (isAllZero == true)
      {
        console.log(i, arr, EmotionData[i].name);

        EmotionData.splice(i, 1);        
      }
      else
      {
        console.log(i, arr, EmotionData[i].name);        
      }
  }

}

function buildLineChartData()
{
  EmotionLineChartData.labels = [EmotionDate[0], EmotionDate[1], EmotionDate[2], EmotionDate[3], EmotionDate[4], EmotionDate[5], EmotionDate[6]];

  for (let i=0; i<EmotionData.length; i++)
  {
    const emotionString = EmotionData[i].name + EmotionData[i].emoji;

    const data = {
      label: emotionString ,
      data: EmotionData[i].emotiondata,
      fill: false,
      tension: 0.4,
      borderColor: EmotionData[i].color,
      backgroundColor: EmotionData[i].color,      
      borderWidth: 2
    }
    EmotionLineChartData.datasets[i] = data;
  }

  console.log(EmotionLineChartData);
}

function initializeEmotionData()
{
  for (let i=0; i<INITIAL_EmotionData.length; i++)
  {
    EmotionData[i] = INITIAL_EmotionData[i];
  }
}


Chart.register(CategoryScale);

const datasets = [
  {
    label: 'Line 1',
    data: [1, 2, 3, 4, 5],
    backgroundColor: 'blue',
  },
  {
    label: 'Line 2',
    data: [2, 4, 6, 8, 10],
    backgroundColor: 'red',
  },
];

const ChartOptions = {
  legend: {
    position: 'bottom',
  }
}

const EmotionChart = () => {

  initializeEmotionData();

  var quoteData;

  const userId = Auth.getProfile().data._id;

  const { loading, data } = useQuery(QUERY_GET_MY_QUOTES, {});

  // populate quoteData
  if (data) {
    quoteData = data.getMyQuotes;
  }

  let quoteDataLength;
  if (quoteData) {
//    console.log("EmotionChart quoteData: ", quoteData);
    quoteDataLength = quoteData.length;

    getSevenDayEmotion2(quoteData);    
  }

  trimEmptyData();

  console.log(EmotionData);

  buildLineChartData();

  // if data isn't here yet, say so
  if (loading) {
    return (
      <>
        <h2>LOADING...</h2>
      </>
    );
  }

  return (
    <div className="container mb-4">
      <div className = "grid gap-6">
        <div className = "EmotionChart ">
          <h1>
               Click legend to view/remove emotion trace
          </h1>
          <Line data={EmotionLineChartData} options={ChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default EmotionChart;
