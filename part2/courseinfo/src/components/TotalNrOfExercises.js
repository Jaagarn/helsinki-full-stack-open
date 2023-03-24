const TotalNrOfExercises = ({ parts }) => {
  const total = parts
    .map((parts) => parts.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <>
      <p style={{ fontWeight: "bolder" }}>total of {total} exercises</p>
    </>
  );
};

export default TotalNrOfExercises;
