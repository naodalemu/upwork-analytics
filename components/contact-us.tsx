"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Twitter, MessageCircle, MessageCirclePlus } from "lucide-react";
import { FaXTwitter, FaUpwork } from "react-icons/fa6";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export function ContactUs() {
  const contactLinks = [
    {
      icon: <Github className="w-5 h-5 text-gray-800" />,
      label: "View on GitHub",
      description: "Check out the source code and contribute.",
      href: "https://github.com/naodalemu/upwork-analytics",
    },
    {
      icon: <FaXTwitter className="w-5 h-5 text-gray-800" />,
      label: "Follow on X/Twitter",
      description: "For announcements, tips, and updates.",
      href: "https://x.com/naod_alemu",
    },
    {
      icon: <FaTelegramPlane className="w-5 h-5 text-[#1089ce]" />,
      label: "Telegram",
      description: "For contacting me personally.",
      href: "https://t.me/naod_alemu",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5 text-[#25d366]" />,
      label: "Whatsapp",
      description: "Another option for contacting me personally.",
      href: "https://wa.me/251902290081",
    },
    {
      icon: <FaUpwork className="w-5 h-5 text-green-600" />,
      label: "Upwork Profile",
      description: "Incase you want to see my experience and work with me.",
      href: "https://www.upwork.com/freelancers/~01cb9ac80cc3e1114e",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">
            Get in Touch
          </CardTitle>
          <CardDescription className="text-center text-gray-600 pt-2">
            Have a question, suggestion, or want to contribute? Here’s how you
            can reach out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border rounded-lg hover:bg-gray-100/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                {link.icon}
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-800">{link.label}</p>
                <p className="text-sm text-gray-500">{link.description}</p>
              </div>
            </a>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center pt-6">
          {/* Use the modern Link syntax by wrapping the component directly */}
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
