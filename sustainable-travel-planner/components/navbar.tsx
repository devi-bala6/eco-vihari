"use client"

import { useState, useEffect } from "react"
import { Leaf, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Calculator", href: "#calculator" },
  { label: "Alternatives", href: "#alternatives" },
  { label: "Trip Planner", href: "#planner" },
  { label: "Impact", href: "#impact" },
  { label: "Rewards", href: "#rewards" },
  { label: "Collaborate", href: "#collaborate" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className={`font-serif text-xl font-bold tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}>
            Eco Vihari
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full transition-colors ${
              scrolled
                ? ""
                : "border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground"
            }`}
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="rounded-full"
          >
            Get Started
          </Button>
        </div>

        <button
          className={`flex lg:hidden items-center justify-center rounded-full p-2 transition-colors ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="w-full rounded-full">
                Sign In
              </Button>
              <Button size="sm" className="w-full rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
