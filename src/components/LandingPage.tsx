import React, { useState } from 'react';

interface LandingPageProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onSignUp }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignUp(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photorealistic_3d_image_of_an_athletic_african_american_woman_in_sporty_attire_holding_a_smartphone_displaying_the_habitflow_logo_the_woman_is_smiling_confidently_facing_the_camera_in_a_dynamic_pose_that_suggests_-AXj9zGVSXVHuZoR688h34nrRORbUnA.jpeg')"}}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="z-10 max-w-md w-full space-y-8 p-10 bg-white bg-opacity-90 rounded-xl shadow-xl">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-center text-orange-600">Welcome to HabitFlow</h1>
          <p className="text-xl mb-5 text-center text-gray-600">Track your habits, achieve your goals, and improve your life.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            className="font-medium text-orange-600 hover:text-orange-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
