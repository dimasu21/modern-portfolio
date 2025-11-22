import React, { useState } from "react";
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import GridBackground from "@/components/GridBackground";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Nama wajib diisi";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email wajib diisi";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Format email tidak valid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subjek wajib diisi";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Pesan wajib diisi";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({
        type: "error",
        message: "Mohon isi semua field dengan benar.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    const form = new FormData();
    // PENTING: Ganti dengan Access Key Anda dari web3forms.com
    form.append("access_key", "e611ba2f-3b37-4514-9f73-618bb28e8e4d");
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    // Optional: Redirect setelah submit berhasil
    form.append("redirect", "https://web3forms.com/success");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: "success",
          message: "Message sent successfully! Thank you for contacting us.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        setStatus({
          type: "error",
          message:
            result.message ||
            "An error occurred while sending the message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred Please try again.",
      });
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20 lg:pt-0 bg-[#04081A] text-white min-h-screen relative overflow-hidden">
      <GridBackground />
      <section className="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="text-gray-300 text-lg">
                  Have a question or want to work together? Drop us a message!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform">
                  <div className="bg-purple-500/10 p-3 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-400">dimsartz021@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group hover:translate-x-2 transition-transform">
                  <div className="bg-pink-500/10 p-3 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-400">Central Java, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.name ? "border-red-500" : "border-gray-700"
                        } focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400`}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.email ? "border-red-500" : "border-gray-700"
                        } focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400`}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.subject ? "border-red-500" : "border-gray-700"
                        } focus:border-blue-500 focus:outline-none transition-colors text-white placeholder-gray-400`}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      placeholder="Message"
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.message ? "border-red-500" : "border-gray-700"
                        } focus:border-blue-500 focus:outline-none transition-colors resize-none text-white placeholder-gray-400`}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      disabled={isSubmitting}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Sending..." : "Send"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Status Message */}
              {status && (
                <div
                  className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${status.type === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p>{status.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
