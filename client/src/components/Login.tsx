import React from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-50">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 w-full h-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-60 animate-pulse"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-pink-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 mx-4 transition-all duration-300 transform border glass shadow-2xl rounded-3xl border-white/50">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 shadow-lg bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl rotate-3 hover:rotate-6 transition-transform duration-300">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Marks</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-500">Curate your digital world.</p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={login}
            className="relative flex items-center justify-center w-full px-6 py-4 text-lg font-bold text-slate-700 transition-all duration-300 bg-white border border-slate-200 shadow-sm rounded-2xl hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 group overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full transition-all duration-300 opacity-0 bg-gradient-to-r from-blue-50 to-purple-50 group-hover:opacity-100"></div>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="relative z-10 w-6 h-6 mr-3 transition-transform group-hover:scale-110"
            />
            <span className="relative z-10">Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-slate-400 bg-white/50 backdrop-blur-sm">Secure Access</span>
            </div>
          </div>

          <p className="text-xs text-center text-slate-400">
            By continuing, you verify that you are you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
