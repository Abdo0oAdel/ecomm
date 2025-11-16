import React, { useState } from "react";
import styles from "./Contact.module.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().trim().required(t("contact.nameRequired")),
    email: Yup.string()
      .trim()
      .email(t("contact.emailInvalid"))
      .required(t("contact.emailRequired")),
    phone: Yup.string()
      .trim()
      .matches(/^\+?[\d\s-()]+$/, t("contact.phoneInvalid"))
      .required(t("contact.phoneRequired")),
    message: Yup.string().trim().required(t("contact.messageRequired")),
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
          {t("nav.home")}
        </Link>
        <span> / </span>
        <Link to="/Contact" className=" mx-1">
          {t("nav.contact")}
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
                  <h3 className="text-base font-semibold">
                    {t("contact.callToUs")}
                  </h3>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  {t("contact.availability")}
                </p>

                <p className="text-sm text-gray-900">
                  {t("contact.phone")}: +201145968517
                </p>
              </div>

              {/* Write To Us */}

              <div className="flex items-start gap-4 mb-6 lex flex-col justify-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-white"></i>
                </div>
                <h3 className="text-base font-semibold">
                  {t("contact.writeToUs")}
                </h3>
                <p className="text-sm text-start text-gray-700 mb-4">
                  {t("contact.formDescription")}
                </p>

                <p className="text-sm text-gray-900 mb-2">
                  {t("contact.emails")}: Bisho.milad77@gmail.com
                </p>

                <p className="text-sm  text-gray-900">
                  {t("contact.emails")}: support@exclusive.com
                </p>
              </div>
            </div>
            {/* Right Side - Formik Form */}
            <div className="lg:col-span-2">
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
                  {t("contact.successMessage")}
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
                          placeholder={t("contact.yourName")}
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
                          placeholder={t("contact.yourEmail")}
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
                          placeholder={t("contact.yourPhone")}
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
                        placeholder={t("contact.yourMessage")}
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
                        {isSubmitting
                          ? t("contact.sending")
                          : t("contact.sendMessage")}
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
