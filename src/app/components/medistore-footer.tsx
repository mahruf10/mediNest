"use client"

// components/medistore-footer.tsx
// Requires: npx shadcn@latest add button input separator
// Icons: npm i lucide-react

import * as React from "react"
import Link from "next/link"
import {
  Share2,
  Camera,
  Mail,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  Truck,
  Clock,
  BadgeCheck,
  Send,
  Video,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

/* ----------------------------- Types & defaults ---------------------------- */

export type FooterLink = { label: string; href: string }
export type FooterColumn = { title: string; links: FooterLink[] }
export type FooterFeature = { icon: LucideIcon; title: string; description: string }
export type FooterSocial = { label: string; href: string; icon: LucideIcon }

export interface MediStoreFooterProps {
  className?: string
  brandName?: string
  tagline?: string
  /** DGDA / pharmacy license text shown in the bottom bar */
  licenseText?: string
  contact?: { phone?: string; email?: string; address?: string; hours?: string }
  features?: FooterFeature[]
  columns?: FooterColumn[]
  socials?: FooterSocial[]
  paymentMethods?: string[]
  bottomLinks?: FooterLink[]
  showFeatures?: boolean
  showNewsletter?: boolean
  onSubscribe?: (email: string) => void | Promise<void>
}

const defaultFeatures: FooterFeature[] = [
  { icon: BadgeCheck, title: "100% Genuine", description: "Sourced from licensed distributors" },
  { icon: Truck, title: "Fast Delivery", description: "Same-day delivery in your city" },
  { icon: ShieldCheck, title: "Secure Payment", description: "Cash on delivery & online payment" },
  { icon: Clock, title: "24/7 Support", description: "Pharmacists ready to help" },
]

const defaultColumns: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "Medicines", href: "/category/medicines" },
      { label: "Healthcare Devices", href: "/category/devices" },
      { label: "Baby & Mom Care", href: "/category/baby-mom" },
      { label: "Vitamins & Supplements", href: "/category/supplements" },
      { label: "Personal Care", href: "/category/personal-care" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Upload Prescription", href: "/prescription" },
      { label: "Track Order", href: "/track-order" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Pharmacists", href: "/pharmacists" },
      { label: "Careers", href: "/careers" },
      { label: "Blog & Health Tips", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

const defaultSocials: FooterSocial[] = [
  { label: "Facebook", href: "#", icon: Share2 },
  { label: "Instagram", href: "#", icon: Camera },
  { label: "Twitter", href: "#", icon: Send },
  { label: "YouTube", href: "#", icon: Video },
]

const defaultBottomLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
]

/* -------------------------------- Component -------------------------------- */

export function MediStoreFooter({
  className,
  brandName = "MediStore",
  tagline = "Your trusted online pharmacy. Genuine medicines and healthcare essentials, delivered to your door.",
  licenseText = "Licensed Pharmacy · Drug License No: XXXX-XXXX",
  contact = {
    phone: "+880 1XXX-XXXXXX",
    email: "support@medistore.com",
    address: "Ashkona panir pump, Dhaka, Bangladesh",
    hours: "Open 24/7",
  },
  features = defaultFeatures,
  columns = defaultColumns,
  socials = defaultSocials,
  paymentMethods = ["bKash", "Nagad", "Visa", "Mastercard", "COD"],
  bottomLinks = defaultBottomLinks,
  showFeatures = true,
  showNewsletter = true,
  onSubscribe,
}: MediStoreFooterProps) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      await onSubscribe?.(email)
      setStatus("done")
      setEmail("")
    } catch {
      setStatus("idle")
    }
  }

  return (
    <footer className={cn("border-t bg-muted/40", className)}>
      {/* Trust features */}
      {showFeatures && features.length > 0 && (
        <>
          <div className="container mx-auto grid gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
        </>
      )}

      {/* Main grid */}
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand + contact */}
        <div className="space-y-4 lg:col-span-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Pill className="size-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">{brandName}</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">{tagline}</p>

          <ul className="space-y-2 text-sm text-muted-foreground">
            {contact.phone && (
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{contact.address}</span>
              </li>
            )}
            {contact.hours && (
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                <span>{contact.hours}</span>
              </li>
            )}
          </ul>

          <div className="flex gap-2 pt-1">
            {socials.map(({ label, href, icon: Icon }) => (
              <Button key={label} variant="outline" size="icon" className="size-9 rounded-full" asChild>
                <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                  <Icon className="size-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Link columns (auto-adjusts to however many you pass) */}
        <div
          className={cn(
            "grid grid-cols-2 gap-8 sm:grid-cols-3",
            showNewsletter ? "lg:col-span-5" : "lg:col-span-8"
          )}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        {showNewsletter && (
          <div className="space-y-3 md:col-span-2 lg:col-span-3">
            <h3 className="text-sm font-semibold">Health tips & offers</h3>
            <p className="text-sm text-muted-foreground">
              Get discounts and wellness advice in your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <Button type="submit" disabled={status === "loading"}>
                {status === "done" ? "Done ✓" : "Join"}
              </Button>
            </form>
          </div>
        )}
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="container mx-auto space-y-4 px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-xs text-muted-foreground md:text-left">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
            {licenseText && <span className="block md:ml-2 md:inline">{licenseText}</span>}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((m) => (
              <span key={m} className="rounded-md border bg-background px-2.5 py-1 text-xs font-medium">
                {m}
              </span>
            ))}
          </div>

          <nav className="flex flex-wrap justify-center gap-4">
            {bottomLinks.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs text-muted-foreground hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          Medicines are sold only against a valid prescription where required by law. Information on this site
          is not a substitute for professional medical advice. Consult your doctor or pharmacist before use.
        </p>
      </div>
    </footer>
  )
}

export default MediStoreFooter
