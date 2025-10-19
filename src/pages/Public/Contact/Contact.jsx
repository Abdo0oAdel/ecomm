import React, { useState } from "react";
import styles from "./Contact.module.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string()
      .trim()
      .email("Email is invalid")
      .required("Email is required"),
    phone: Yup.string()
      .trim()
      .matches(/^\+?[\d\s-()]+$/, "Phone number is invalid")
      .required("Phone is required"),
    message: Yup.string().trim().required("Message is required"),
  });

  // send form data to the server testing with a mock API endpoint
  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        resetForm();
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        className={`${styles.aboutContainer} mx-9 mt-3 flex flex-row flex-start text-md text-black pb-5 cursor-pointer`}
      >
        <Link to="/" className=" text-gray-300 mx-1 ">
          Home
        </Link>
        <span> / </span>
        <Link to="/Contact" className=" mx-1  ">
          Contact
        </Link>
      </div>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto mt-25  px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="border-b border-gray-200 pb-8 flex flex-col items-start justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <h3 className="text-base font-semibold">Call To Us</h3>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  We are available 24/7, 7 days a week.
                </p>

                <p className="text-sm text-gray-900">Phone: +201145968517</p>
              </div>

              {/* Write To Us */}

              <div className="flex items-center gap-4 mb-6 lex flex-col items-start justify-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <h3 className="text-base font-semibold">Write To Us</h3>
                <p className="text-sm text-start text-gray-700 mb-4">
                  Fill out our form
                  <br /> and we will contact you within 24 hours.
                </p>

                <p className="text-sm text-gray-900 mb-2">
                  Emails: Bisho.milad77@gmail.com
                </p>

                <p className="text-sm  text-gray-900">
                  Emails: support@exclusive.com
                </p>
              </div>
            </div>
            {/* Right Side - Formik Form */}
            <div className="lg:col-span-2">
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
                  ✓ Message sent successfully!
                </div>
              )}

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Inputs Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Name */}
                      <div>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Your Name *"
                          className="w-full px-4 py-3 bg-gray-100 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Your Email *"
                          className="w-full px-4 py-3 bg-gray-100 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <Field
                          type="tel"
                          name="phone"
                          placeholder="Your Phone *"
                          className="w-full px-4 py-3 bg-gray-100 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <ErrorMessage
                          name="phone"
                          component="p"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Your Message"
                        rows="8"
                        className="w-full px-4 py-3 bg-gray-100 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                      />
                      <ErrorMessage
                        name="message"
                        component="p"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
