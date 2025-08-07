"use client";

import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Github,
  Twitter,
  Send,
  Check,
  AlertTriangle,
} from "lucide-react";
import {
  FaXTwitter,
  FaUpwork,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa6";
import Link from "next/link";

export function ContactUs() {
  const [formStatus, setFormStatus] = useState("idle"); // 'idle', 'sending', 'sent', 'error'
  const formRef = useRef<HTMLFormElement>(null);

  const contactLinks = [
    {
      icon: <Github className="w-5 h-5 text-gray-700" />,
      label: "GitHub",
      description: "Source code & contributions",
      href: "https://github.com/naodalemu/upwork-analytics",
    },
    {
      icon: <FaXTwitter className="w-5 h-5 text-gray-700" />,
      label: "X/Twitter",
      description: "Announcements & updates",
      href: "https://x.com/naod_alemu",
    },
    {
      icon: <FaTelegram className="w-5 h-5 text-[#1089ce]" />,
      label: "Telegram",
      description: "Direct personal contact",
      href: "https://t.me/naod_alemu",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5 text-[#25d366]" />,
      label: "Whatsapp",
      description: "Another direct option",
      href: "https://wa.me/251902290081",
    },
    {
      icon: <FaUpwork className="w-5 h-5 text-green-600" />,
      label: "Upwork Profile",
      description: "View my work & experience",
      href: "https://www.upwork.com/freelancers/~01cb9ac80cc3e1114e",
    },
  ];

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormStatus("sending");

    emailjs
      .sendForm(
        "service_b4cc0sg",
        "template_c0b0i9h",
        formRef.current,
        "Q02nSjXoTREWNVgcR"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setFormStatus("sent");
          formRef.current?.reset();
          setTimeout(() => setFormStatus("idle"), 5000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setFormStatus("error");
          setTimeout(() => setFormStatus("idle"), 5000);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Column: Form */}
          <div className="p-8 bg-white">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Send a Message
              </CardTitle>
              <CardDescription className="text-gray-600 pt-2">
                Have a question or suggestion? Fill out the form below.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="user_name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Name (Optional)
                  </label>
                  <Input
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="Your Name"
                    className="bg-slate-100 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="user_email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    name="user_email"
                    id="user_email"
                    placeholder="your@email.com"
                    className="bg-slate-100 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Message (Required)
                  </label>
                  <Textarea
                    name="message"
                    id="message"
                    placeholder="I have a suggestion for..."
                    required
                    rows={5}
                    className="bg-slate-100 border-slate-200"
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 transition-all duration-300"
                    disabled={formStatus !== "idle"}
                  >
                    {formStatus === "idle" && (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                    {formStatus === "sending" && "Sending..."}
                    {formStatus === "sent" && (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Message Sent!
                      </>
                    )}
                    {formStatus === "error" && (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2" /> Try Again
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>

          {/* Right Column: Other Links */}
          <div className="p-8 bg-slate-50 border-l border-slate-200">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Other Ways to Reach Out
              </CardTitle>
              <CardDescription className="text-gray-600 pt-2">
                Connect with me on other platforms.
              </CardDescription>
            </CardHeader>
            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-slate-200 bg-white rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    {link.icon}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{link.label}</p>
                    <p className="text-sm text-gray-500">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <CardFooter className="flex justify-center pt-6 bg-white border-t">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
