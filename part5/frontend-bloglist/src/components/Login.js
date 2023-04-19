export const Login = ({
  attemptLogin,
  username,
  password,
  handleOnChangedUsername,
  handleOnChangedPassword
}) => {
  return (
    <>
      <form onSubmit={attemptLogin}>
        <div>
          username:{" "}
          <input value={username} onChange={handleOnChangedUsername} />
        </div>
        <div style={{ marginTop: 10 }} >
          password:{" "}
          <input value={password} onChange={handleOnChangedPassword} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  );
};


export default Login