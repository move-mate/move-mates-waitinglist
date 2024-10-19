import React, { useState } from 'react';
import { Car, CheckCircle, ChevronRight } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join waitlist');
      }
      
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Car className="w-8 h-8 mr-2" />
          <span className="text-2xl font-bold">MoveMates</span>
        </div>
        <nav>
          <a href="#about" className="mr-4 hover:underline">About</a>
          <a href="#features" className="mr-4 hover:underline">Features</a>
          <a href="#join" className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300">Join Waitlist</a>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">The Future of Urban Transportation</h1>
          <p className="text-xl mb-8">Experience move mates.</p>
          <a href="#join" className="bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 inline-flex items-center">
            Get Early Access
            <ChevronRight className="ml-2" />
          </a>
        </section>

        {/* ADD INFO HERE */}

        <section id="join" className="bg-white text-blue-500 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4">Join the Waitlist</h2>
          {submitted ? (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <p className="text-xl">Thank you for joining our waitlist!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Join Waitlist
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          )}
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 text-center">
        <p>&copy; 2024 MoveMates. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;