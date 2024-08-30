import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Registration = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const { createUser } = useContext(AuthContext);
  const handelRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    //success and error clean
    setSuccess("");
    setRegistrationError("");
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        e.target.reset();
        console.log(user);
        setSuccess("Registration SuccessFull");
      })
      .catch((error) => {
        console.error(error);
        setRegistrationError(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Registration now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handelRegistration} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
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
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Registration</button>
            </div>
          </form>
          {success && <p className="text-green-600 ml-8">{success}</p>}
          {registrationError && (
            <p className="text-green-600 ml-8">{registrationError}</p>
          )}
          <p className="ml-8 mb-4">
            Already have an account{" "}
            <Link className="underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
