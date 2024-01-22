import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    console.log(authToken);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        <button className='button'>Home</button>
                    </Link>
                </div>
                <div className="navbar-end">
                    {!authToken && (
                        <>
                            <Link to="/login" className="navbar-item">
                                <button className='button is-info'>Log in</button>
                            </Link>
                            <Link to="/signup" className="navbar-item">
                                <button className='button is-primary'>Sign up</button>
                            </Link>
                        </>
                    )}
                    {authToken && (
                        <>
                            <Link to="/favorites" className="navbar-item">
                                <button className='button is-warning'>Favoris</button>
                            </Link>
                            <button className='button is-danger' onClick={logout}>
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
