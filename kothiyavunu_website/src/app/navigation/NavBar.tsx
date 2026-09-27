"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "About Us", href: "/about" },
  { label: "Log in / Sign up", href: "/account" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          Kothiyavunu
        </Link>

        <ul className={styles.links}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
