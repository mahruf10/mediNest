"use client";

import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Menu,
  Package,
  Phone,
  Search,
  ShoppingCart,
  User,
  Zap,
  ArrowLeftRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const NAVY = "#1e3a5f"; // tomar brand color diye replace koro

const allProducts = [
  { label: "Medicine", href: "/products/medicine" },
  { label: "Supplements", href: "/products/supplements" },
  { label: "Medical Devices", href: "/products/devices" },
];

const veterinary = [
  { label: "Pet Medicine", href: "/veterinary/medicine" },
  { label: "Pet Food", href: "/veterinary/food" },
];

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

function NavDropdown({
  label,
  items,
  badge,
}: {
  label: string;
  items: { label: string; href: string }[];
  badge?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-[15px] font-medium text-white outline-none hover:text-white/80">
        {label}
        {badge && (
          <Badge className="h-5 rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white hover:bg-red-500">
            {badge}
          </Badge>
        )}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  return (
    <header className="w-full">
      {/* ===== Top bar: logo, search, phone, icons ===== */}
      <div className="bg-white">
        <div className="mx-auto flex h-[80px] max-w-7xl items-center gap-4 px-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4 px-4 text-base font-medium">
                <Link href="/products">All Products</Link>
                <Link href="/veterinary">Veterinary</Link>
                {links.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
                <Link href="/track-order">Track Order</Link>
                <Link href="/flash-deal" className="text-orange-500">
                  Flash Deal
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="shrink-0 text-2xl font-extrabold" style={{ color: NAVY }}>
           <Image src={'/mediStore.png'} alt='logo' width={80} height={30} />
           {/* <img src="../../public/mediStore.png" alt="logo" /> */}
          </Link>

          {/* Search */}
          <div className="relative mx-auto hidden w-full max-w-2xl md:flex">
            <Input
              placeholder="Search Products..."
              className="h-12 rounded-r-none border-r-0 text-base focus-visible:ring-0"
            />
            <Button
              className="h-12 rounded-l-none px-5 text-white"
              style={{ backgroundColor: NAVY }}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-5" style={{ color: NAVY }}>
            <a
              href="tel:01405100400"
              className="hidden items-center gap-2 text-base font-semibold xl:flex"
            >
              <Phone className="h-5 w-5" />
              01405100400
            </a>
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/compare" aria-label="Compare" className="hidden sm:block">
              <ArrowLeftRight className="h-6 w-6" />
            </Link>
            <Link href="/cart" aria-label="Cart">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/account" aria-label="Account">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Bottom bar: nav links ===== */}
      <div className="hidden lg:block" style={{ backgroundColor: NAVY }}>
        <div className="mx-auto flex h-[52px] max-w-7xl items-center gap-9 px-4">
          <NavDropdown label="All Products" items={allProducts} badge="Sale!" />
          <NavDropdown label="Veterinary" items={veterinary} />

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-white hover:text-white/80"
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/track-order"
            className="flex items-center gap-2 text-[15px] font-medium text-white hover:text-white/80"
          >
            <Package className="h-5 w-5 text-amber-300" />
            Track Order
          </Link>

          <Link
            href="/flash-deal"
            className="ml-auto flex h-full items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-6 text-[15px] font-semibold text-white"
          >
            <Zap className="h-4 w-4" />
            Flash Deal
          </Link>
        </div>
      </div>
    </header>
  );
}
