"use client"

import * as React from "react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  PlusIcon,
  LayoutDashboardIcon,
  CalendarCheckIcon,
  ClockIcon,
  LayersIcon,
  CreditCardIcon,
  BarChart3Icon,
  Settings2Icon,
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "john",
    email: "john@example.com",
    plan: "Free plan",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "New booking", url: "#", icon: <PlusIcon /> },
    { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboardIcon />, isActive: true },
    { title: "Bookings", url: "#", icon: <CalendarCheckIcon /> },
    { title: "Schedule", url: "#", icon: <ClockIcon /> },
    { title: "Services", url: "#", icon: <LayersIcon /> },
    { title: "Payments", url: "#", icon: <CreditCardIcon /> },
    { title: "Analytics", url: "#", icon: <BarChart3Icon />, badge: "Pro", disabled: true },
    { title: "Settings", url: "#", icon: <Settings2Icon /> },
  ],
}

function SidebarToggle() {
  const { state } = useSidebar()
  const label = state === "collapsed" ? "Open sidebar" : "Close sidebar"
  return (
    <Tooltip>
      <TooltipTrigger render={<SidebarTrigger className="hidden size-8 md:flex" />} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <a
            href="/dashboard"
            className="flex items-center px-2 group-data-[collapsible=icon]:hidden"
          >
            <span className="text-xl font-medium font-rounded tracking-tight">Loty</span>
          </a>
          {/* Collapse trigger: sits inside the sidebar on desktop, takes the
              brand's spot when collapsed and matches the nav icon size. */}
          <SidebarToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
