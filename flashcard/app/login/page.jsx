export default function LoginForm() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="max-w-xl mx-auto text-neutral-content text-center">
        <div className="bg-base-100 p-8 rounded-box shadow-xl text-left">
          <h1 className="text-xl font-bold mb-6 text-center">Please log in</h1>

          <form>
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-6">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
