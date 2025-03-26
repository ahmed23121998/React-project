import React, { useState } from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { signUp } from "../../Services/Auth";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {

            const userCredential = await signUp(data.email, data.password);
            console.log("User registered:", userCredential.user);


            navigate("/login");
        } catch (error) {

            setError(error.message);
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center mt-5 bg-light">
            <div className="card shadow-lg border-0" style={{ maxWidth: "450px" }}>
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4 fw-bold">Register</h2>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format"
                                    }
                                })}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-semibold">Username</label>
                            <input
                                type="text"
                                id="username"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Enter username"
                                {...register("username", {
                                    required: "Username is required",
                                    pattern: {
                                        value: /^\S+$/,
                                        message: "Username cannot contain spaces"
                                    }
                                })}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                                            message: "Password must be 8+ characters, include uppercase, lowercase, number, and special character."
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === watch("password") || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                        </div>

                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary btn-lg">Register</button>
                        </div>

                        <div className="text-center mt-3">
                            <span className="text-muted">Already have an account? </span>
                            <a href="/login" className="text-decoration-none">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;