const Login = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name=""
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br />
                <button type="submit">Login</button>  
            </form>
        </div>
    )
}

export default Login