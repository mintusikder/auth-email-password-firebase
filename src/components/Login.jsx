import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const { signInUser, resetEmail, googleSignIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    //success and error clean
    setSuccess("");
    setLoginError("");
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        e.target.reset();
        navigate("/");
        ("/");
        console.log(user);
        if (result.user.emailVerified) {
          setSuccess("Login SuccessFull");
        } else {
          alert("Please Verified email");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError(error.message);
      });
  };
  //forget pass
  const handelForgetPass = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      console.log("Please enter your email address.", emailRef.current.value);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter A valid email");
    }
    resetEmail(email)
      .then(() => {
        alert("Please Check your email");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //google login
  const handelGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  className="absolute mt-4 right-4"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEye></FaEye> : <FaEyeSlash />}
                </span>
              </div>
              <label className="label">
                <a
                  onClick={handelForgetPass}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {success && <p className="text-green-600 ml-8">{success}</p>}
          {loginError && <p className="text-red-600 ml-8">{loginError}</p>}
          <p className="ml-8 mb-4">
            New Account{" "}
            <Link className="underline" to="/registration">
              Registration
            </Link>{" "}
          </p>
          <button className="btn btn-primary" onClick={handelGoogle}>Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
