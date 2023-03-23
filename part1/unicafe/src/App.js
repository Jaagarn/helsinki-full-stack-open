import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td style={{ paddingLeft: 10 }}>{value}</td>
      </tr>
    </>
  );
};

const Statistics = (props) => {
  const goodClicks = props.goodClicks;
  const neutralClicks = props.neutralClicks;
  const badClicks = props.badClicks;
  const allClicks = goodClicks + badClicks + neutralClicks;
  const average = (goodClicks + (badClicks * -1)) / allClicks;
  const positive = goodClicks / allClicks;

  if (allClicks <= 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={goodClicks} />
            <StatisticsLine text="neutral" value={neutralClicks} />
            <StatisticsLine text="bad" value={badClicks} />
            <StatisticsLine text="all" value={allClicks} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
      </>
    );
  }
};

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad} />
    </div>
  );
};

export default App;