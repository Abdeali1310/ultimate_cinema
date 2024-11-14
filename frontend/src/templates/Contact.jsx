/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_w298ziy', 'template_cc4w0bp', form.current, {
        publicKey: 'BDvi8lGGu5jRvyddx',
      })
      .then(
        () => {
        //   console.log('SUCCESS!');
        form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <>
    <div className=" h-screen w-screen bg-zinc-500">
        
      <div className="max-w-md  w-screen mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <input
              type="submit"
              value="Send"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Contact;
