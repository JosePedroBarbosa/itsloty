"use client"

import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { UserIcon, CreditCardIcon, ShieldIcon } from "lucide-react"

const nav = [
  { name: "Account", icon: <UserIcon /> },
  { name: "Billing", icon: <CreditCardIcon /> },
  { name: "Security", icon: <ShieldIcon /> },
] as const

type Section = (typeof nav)[number]["name"]

type SettingsUser = {
  name: string
  email: string
  plan?: string
  avatar: string
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </div>
  )
}

/* ----------------------------- Account ----------------------------- */
// TODO(better-auth): hydrate from the session / user object and persist edits
// through better-auth's updateUser. Avatar upload via the storage integration.
function AccountSection({ user }: { user: SettingsUser }) {
  const initials = user.name.slice(0, 2).toUpperCase()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Field label="Name">
        <Input defaultValue={user.name} placeholder="Your name" />
      </Field>

      <Field label="Email">
        <Input defaultValue={user.email} type="email" disabled />
        <p className="text-xs text-muted-foreground">Your email can&apos;t be changed.</p>
      </Field>

      <div>
        <Button size="sm">Save changes</Button>
      </div>
    </div>
  )
}

/* ----------------------------- Billing ----------------------------- */
// TODO(better-auth): read subscription state from the @better-auth/stripe
// plugin (active plan, status, period end) and open the Stripe billing portal.
function BillingSection({ user }: { user: SettingsUser }) {
  const plan = user.plan ?? "Free plan"
  const isFree = plan.toLowerCase().includes("free")
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">{plan}</p>
            <p className="text-xs text-muted-foreground">
              {isFree
                ? "You're on the free plan. Upgrade to unlock payments and analytics."
                : "Your subscription renews automatically."}
            </p>
          </div>
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {isFree ? "Active" : "Subscribed"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {isFree ? (
          <Button size="sm">Upgrade to Pro</Button>
        ) : (
          <Button variant="outline" size="sm">
            Manage billing
          </Button>
        )}
      </div>
    </div>
  )
}

/* ----------------------------- Security ---------------------------- */
// TODO(better-auth): list active sessions via listSessions(), revoke through
// revokeSession(), and remove the account with deleteUser().
const sampleSessions = [
  { device: "MacBook Pro · Chrome", location: "Lisbon, PT", lastActive: "Active now", current: true },
  { device: "iPhone 15 · Safari", location: "Lisbon, PT", lastActive: "2 hours ago", current: false },
]

function SecuritySection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">Active sessions</span>
        <div className="divide-y rounded-xl border">
          {sampleSessions.map((s) => (
            <div key={s.device} className="flex items-center justify-between gap-4 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{s.device}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.location} - {s.lastActive}
                </p>
              </div>
              {s.current ? (
                <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  This device
                </span>
              ) : (
                <Button variant="ghost" size="sm">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
        <div>
          <p className="text-sm font-medium text-destructive">Delete account</p>
          <p className="text-xs text-muted-foreground">
            Permanently delete your account and all of your data. This cannot be undone.
          </p>
        </div>
        <div>
          <Button variant="destructive" size="sm">
            Delete account
          </Button>
        </div>
      </div>
    </div>
  )
}

export function SettingsDialog({
  open,
  onOpenChange,
  user,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  user: SettingsUser
}) {
  const [active, setActive] = React.useState<Section>("Account")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your account, billing, and security settings.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === active}
                          onClick={() => setActive(item.name)}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 px-6">
              <h2 className="text-base font-medium">{active}</h2>
            </header>
            <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-6">
              {active === "Account" && <AccountSection user={user} />}
              {active === "Billing" && <BillingSection user={user} />}
              {active === "Security" && <SecuritySection />}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
