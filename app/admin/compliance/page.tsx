"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, AlertCircle, CheckCircle } from "lucide-react"

type KycTier = "NONE" | "L1" | "L2"

interface UserCompliance {
  id: string
  walletAddress: string
  kycTier: KycTier
  country: string | null
  createdAt: string
  lastActive: string
}

export default function AdminCompliancePage() {
  const [users, setUsers] = useState<UserCompliance[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTier, setFilterTier] = useState<string>("all")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/compliance")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTier = filterTier === "all" || user.kycTier === filterTier
    return matchesSearch && matchesTier
  })

  const tierCounts = {
    NONE: users.filter((u) => u.kycTier === "NONE").length,
    L1: users.filter((u) => u.kycTier === "L1").length,
    L2: users.filter((u) => u.kycTier === "L2").length,
  }

  const getTierBadge = (tier: KycTier) => {
    switch (tier) {
      case "NONE":
        return <Badge variant="destructive">Not Verified</Badge>
      case "L1":
        return <Badge variant="secondary">Level 1</Badge>
      case "L2":
        return <Badge variant="default">Level 2</Badge>
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading compliance data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Compliance Management</h1>
        <p className="text-muted-foreground">Monitor user verification status and compliance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Verified</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tierCounts.NONE}</div>
            <p className="text-xs text-muted-foreground">
              {((tierCounts.NONE / users.length) * 100).toFixed(1)}% of users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level 1</CardTitle>
            <CheckCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tierCounts.L1}</div>
            <p className="text-xs text-muted-foreground">
              {((tierCounts.L1 / users.length) * 100).toFixed(1)}% of users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level 2</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tierCounts.L2}</div>
            <p className="text-xs text-muted-foreground">
              {((tierCounts.L2 / users.length) * 100).toFixed(1)}% of users
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Compliance Status</CardTitle>
          <CardDescription>View and manage user verification levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by wallet or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="NONE">Not Verified</SelectItem>
                <SelectItem value="L1">Level 1</SelectItem>
                <SelectItem value="L2">Level 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>KYC Tier</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-sm">{user.id.slice(0, 8)}...</TableCell>
                      <TableCell className="font-mono text-sm">{user.walletAddress.slice(0, 8)}...</TableCell>
                      <TableCell>{getTierBadge(user.kycTier)}</TableCell>
                      <TableCell>{user.country || "N/A"}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
