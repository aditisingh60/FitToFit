const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <button 
        className="w-full bg-green-600 text-white p-2 rounded"
        onClick={() => {
          localStorage.setItem('token', 'fake-token');
          window.location.href = '/dashboard';
        }}
      >
        Sign In (Mock)
      </button>
    </div>
  );
};

export default Login;
