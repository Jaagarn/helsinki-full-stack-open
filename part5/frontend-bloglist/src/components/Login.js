export const Login = ({
  attemptLogin,
  username,
  password,
  handleOnChangedUsername,
  handleOnChangedPassword,
}) => {
  return (
    <>
      <form onSubmit={attemptLogin}>
        <div>
          username:{" "}
          <input
            value={username}
            onChange={handleOnChangedUsername}
            data-testid="login-username-input"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          password:{" "}
          <input
            value={password}
            onChange={handleOnChangedPassword}
            data-testid="login-password-input"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <button type="submit" data-testid="login-login-button">
            login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
