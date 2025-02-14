"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutGrid, Image, FileText, Code2, Boxes, CreditCard, Settings, LogOut } from "lucide-react"
import LoginButton from "@/components/LoginLogoutButton"

const navigation = [
  { name: "Home", href: "/dashboard", icon: LayoutGrid },
  { name: "Dub", href: "/dashboard/dub", icon: FileText },
  //{ name: "Assistant", href: "/dashboard/assistant", icon: Code2 },
  { name: "Credits", href: "/dashboard/credits", icon: CreditCard },
  { name: "Incoming 🔥", href: "/dashboard/future", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 border-r bg-background">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">DubHere</h1>
      </div>
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">S</div>
          <div className="ml-3">
            <p className="text-sm font-medium">User</p>
            <LoginButton/>
          </div>
        </div>
      </div>
    </div>
  )
}

