"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Gavgav Pet 🐶
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <Link href="/">Ana Sayfa</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/services">Hizmetler</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/appointment">Randevu</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact">İletişim</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button asChild>
          <Link href="/appointment">Randevu Al</Link>
        </Button>
      </div>
    </nav>
  );
}
