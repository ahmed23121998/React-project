import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signIn } from "../../Services/Auth";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/token";
import toast from "react-hot-toast";

function Login() {
    const { setIsAuth } = useContext(tokenContext);
    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {

            const userCredential = await signIn(data.email, data.password);
            console.log("User registered:", userCredential.user.accessToken);
            localStorage.setItem("user", JSON.stringify(userCredential.user.accessToken));
            setIsAuth(true)

            toast.success('Login Successfuly')



            nav("/movies/:page");
        } catch (error) {


            toast.error("This didn't work." + error.message)
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg border-0" style={{ maxWidth: "400px" }}>
                <div className="card-body p-5">
                    <h2 className="card-title text-center mb-4 fw-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email</label>
                            <input
                                id="email"
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
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
                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    placeholder="Enter password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters" }
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


                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-lg">Login</button>
                        </div>

                        <div className="text-center mt-3">
                            <a href="#" className="text-decoration-none">Forgot password?</a>
                        </div>

                    </form>
                </div>
            </div>

        </div>

    );
}

export default Login;
