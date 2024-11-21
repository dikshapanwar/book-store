import React, { useState } from "react";
import bannerImage from "../../assets/banner.png";
import { Link } from "react-router-dom";
import getBaseUrl from "../../utils/baseUrl";

function Banner() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle email input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      // Send the subscription request to the backend
      const response = await fetch(`${getBaseUrl()}/api/subscribe/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear the email input on success
      } else {
        setMessage(data.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <section className="flex flex-col md:flex-row-reverse py-16 items-center justify-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img
          src={bannerImage}
          alt="New releases this week, featuring the theme 'I want a better catastrophe'"
          className="max-w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7">
          New Releases This Week
        </h1>
        <p className="mb-10">
          "I want a better catastrophe" can be seen as an intriguing paradox,
          reflecting the desire for something less destructive amid chaos.
          Here's some text exploring this concept: I want a better catastrophe.
        </p>
        <div className="flex flex-col items-center mt-8">
          {!message.includes("Thank you") ? ( // Show form if no success message
            <form
              id="newsletter-form"
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center w-full sm:w-34"
            >
              <label htmlFor="email" className="sr-only">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange}
                required
                aria-label="Email Address"
                className="bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 w-full
                 md:flex-grow focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4 md:mb-0"
              />
              <button
                type="submit"
                className="bg-primary text-white py-3 px-6 rounded-md shadow-md hover:bg-primary-dark transition-all duration-200 md:ml-4"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          ) : (
            <p className="text-center text-gray-500 text-sm mt-4">
              {message}
            </p>
          )}
          {!message.includes("Thank you") && ( // Show this only when the form is visible
            <p className="text-gray-500 text-sm mt-4">
              Stay updated with our latest news and offers. No spam, we promise!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Banner;
