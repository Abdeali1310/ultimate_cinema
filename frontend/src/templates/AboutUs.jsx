/* eslint-disable no-unused-vars */
import React from 'react'

function AboutUs() { document.title = "The Ultimate Cinema | About"
    return (
      <div className="h-screen overflow-x-hidden overflow-y-auto mx-auto bg-gray-100">
        {/* Header without Nav */}
        <header className="bg-gray-900 text-white py-8 text-center">
          <h1 className="text-4xl font-bold">The Ultimate Cinema</h1>
        </header>
  
        {/* Main Content */}
        <main className="container mx-auto py-16 px-4">
          <section className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About The Ultimate Cinema</h2>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to <strong>The Ultimate Cinema</strong> – your one-stop destination for discovering and exploring movies, TV shows, and celebrities. 
              We bring the world of cinema directly to your screen, helping you stay updated with all the latest entertainment content.
            </p>
  
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h3>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li><strong>Discover Movies & TV Shows:</strong> Access a wide database of titles from around the world, from timeless classics to the hottest new releases.</li>
              <li><strong>Explore Celebrity Profiles:</strong> Learn about your favorite actors, directors, and other cinema icons.</li>
              <li><strong>Watch Trailers:</strong> Stay up to date with the latest trailers and teaser releases, all in one place.</li>
              <li><strong>Easy Search:</strong> Find exactly what you are looking for using our intuitive search functionality.</li>
            </ul>
  
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 mb-6">
              At <strong>The Ultimate Cinema</strong>, our goal is to provide an engaging, user-friendly platform for cinema lovers. Whether you’re a movie enthusiast or a casual viewer, 
              we aim to enrich your cinematic experience with comprehensive information and seamless navigation.
            </p>
  
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Up-to-Date Database:</strong> Stay informed with our constantly updated movie and TV show information.</li>
              <li><strong>User-Centric Design:</strong> A simple and elegant design that makes exploring cinema a breeze.</li>
              <li><strong>Rich Content:</strong> Detailed profiles for movies, shows, and celebrities, with trailers included.</li>
            </ul>
          </section>
        </main>
  
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 The Ultimate Cinema. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
}

export default AboutUs