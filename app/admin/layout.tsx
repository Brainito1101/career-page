import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel - Brainito",
  description: "Brainito Career Management Admin Panel",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
