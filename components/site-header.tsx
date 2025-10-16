"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gamepad2, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Lobby", href: "/lobby" },
  { name: "Affiliates", href: "/affiliates" },
  { name: "Compliance", href: "/compliance" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span>Solana 1v1</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex bg-transparent">
            Connect Wallet
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button variant="outline" className="mt-4 bg-transparent">
                  Connect Wallet
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
