"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, DollarSign, TrendingUp } from "lucide-react"

interface AffiliateData {
  id: string
  code: string
  userId: string
  totalReferrals: number
  totalEarnings: number
  createdAt: string
}

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<AffiliateData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchAffiliates()
  }, [])

  const fetchAffiliates = async () => {
    try {
      const response = await fetch("/api/admin/affiliates")
      if (response.ok) {
        const data = await response.json()
        setAffiliates(data)
      }
    } catch (error) {
      console.error("Failed to fetch affiliates:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAffiliates = affiliates.filter(
    (affiliate) =>
      affiliate.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalAffiliates = affiliates.length
  const totalReferrals = affiliates.reduce((sum, a) => sum + a.totalReferrals, 0)
  const totalEarnings = affiliates.reduce((sum, a) => sum + a.totalEarnings, 0)

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading affiliates...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Affiliate Management</h1>
        <p className="text-muted-foreground">Monitor and manage affiliate partners</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAffiliates}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid Out</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEarnings.toFixed(4)} SOL</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Affiliates</CardTitle>
          <CardDescription>View and manage all affiliate partners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by code or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAffiliates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No affiliates found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      <TableCell className="font-mono">{affiliate.code}</TableCell>
                      <TableCell className="font-mono text-sm">{affiliate.userId.slice(0, 8)}...</TableCell>
                      <TableCell>{affiliate.totalReferrals}</TableCell>
                      <TableCell>{affiliate.totalEarnings.toFixed(4)} SOL</TableCell>
                      <TableCell>{new Date(affiliate.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={affiliate.totalReferrals > 0 ? "default" : "secondary"}>
                          {affiliate.totalReferrals > 0 ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
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
