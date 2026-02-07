"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const capturedData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      };

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(capturedData),
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <motion.div className="absolute inset-0 opacity-10" style={{ opacity, y }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            GET IN TOUCH
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Ready to protect your vehicle? Let&apos;s talk.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="text-gray-400">
                      Car Trendz, UB City Ground Floor
                    </p>
                    <p className="text-gray-400">
                      Vittal Mallya Rd, KG Halli, D&apos; Souza Layout, Ashok
                      Nagar, Bengaluru, Karnataka 560001
                    </p>
                    <p className="text-gray-400">India</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start space-x-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href="mailto:support@cartrendz.com"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      support@cartrendz.com
                    </a>
                  </div>
                </motion.div>

                <motion.div className="flex items-start space-x-4">
                  <div className="text-2xl">📱</div>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a
                      href="tel:+919886066625"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      +91 9886066625
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-4">Follow us</p>
              <div className="flex space-x-4">
                {[
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/vkoolbengaluru/",
                  },
                  {
                    name: "Facebook",
                    href: "https://www.facebook.com/vkoolIndia1",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-white text-black font-bold rounded-lg"
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </motion.button>

            {submitStatus === "success" && (
              <p className="text-green-400 text-sm text-center">
                ✓ Thank you! Your message has been sent successfully.
              </p>
            )}

            {submitStatus === "error" && (
              <p className="text-red-400 text-sm text-center">
                ✗ Something went wrong. Please try again.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
