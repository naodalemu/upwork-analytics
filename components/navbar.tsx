"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarChart3, Github, Heart, Menu, MessageSquare } from "lucide-react";

export function Navbar() {
  const navLinks = [
    {
      href: "/contact",
      label: "Contact Us",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      href: "https://github.com/naodalemu/upwork-analytics",
      label: "GitHub",
      icon: <Github className="w-4 h-4" />,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Home Link */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900"
          >
            <img src="/logo.png" alt="" className="h-10" />
            <span>Upwrok Analytics</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.label === "GitHub" ? "_blank" : "_self"}
              >
                <Button variant="ghost">
                  {link.icon} {link.label}
                </Button>
              </Link>
            ))}
            <a
              href="https://naodalemu.lemonsqueezy.com/buy/ebfeaf68-6feb-4676-ad7e-196f9ed83642"
              className="lemonsqueezy-button inline-flex items-center justify-center h-10 px-4 py-2 font-semibold text-white  text-sm rounded-md shadow-md bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
            >
              <Heart className="w-4 h-4 mr-2" />
              Buy me a coffee?
            </a>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid gap-4 py-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.label === "GitHub" ? "_blank" : "_self"}
                      className="flex items-center space-x-3 text-lg font-medium text-gray-800 hover:text-blue-600"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <div className="border-t pt-4">
                    <a
                      href="https://YOUR-STORE.lemonsqueezy.com/buy/YOUR-PRODUCT-ID" // IMPORTANT: Replace this
                      className="lemonsqueezy-button flex items-center justify-center w-full h-11 px-4 py-2 font-semibold text-white rounded-md shadow-md bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-colors"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Support the Project
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
