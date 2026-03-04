import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.classList.toggle('dark', next === 'dark');
        localStorage.setItem('theme', next);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (email === "hp" && password === "hp") {
            toast.success("Login Successful!");
            login(email);

            // ✅ SAFE last-route redirect
            const lastRoute = localStorage.getItem("lastRoute");

            if (lastRoute && lastRoute !== "/login") {
                navigate(lastRoute);
            } else {
                navigate("/intro");
            }

            localStorage.removeItem("lastRoute"); // ✅ cleanup
        } else {
            toast.error("Invalid Credentials");
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 relative">
            <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 p-2 rounded-lg text-white/90 hover:bg-white/20 transition"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>
            <Toaster position="bottom-right" reverseOrder={false} />
            <div className="p-8 rounded-2xl shadow-xl w-full max-w-md" style={{ background: 'var(--bg)' }}>
                <h2 className="text-3xl font-bold text-center mb-6" style={{ color: 'var(--text)' }}>
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                        <label className="block font-medium mb-1" style={{ color: 'var(--text)' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            style={{ border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)' }}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1" style={{ color: 'var(--text)' }}>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                style={{ border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text)' }}
                                placeholder="Enter your password"
                            />
                            <span
                                className="absolute right-3 top-2.5 cursor-pointer"
                                style={{ color: 'var(--text-muted)' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-5" style={{ color: 'var(--text-secondary)' }}>
                    Don’t have an account?{" "}
                    <a href="#" className="font-semibold hover:underline" style={{ color: 'var(--accent)' }}>
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
