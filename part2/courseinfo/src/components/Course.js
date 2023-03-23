const Header = ({ name }) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

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

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <TotalNrOfExercises parts={course.parts} />
    </div>
  );
};

export default Course;
