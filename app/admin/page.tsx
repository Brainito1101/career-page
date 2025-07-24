"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Download,
  Eye,
  MessageSquare,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [applications, setApplications] = useState([])
  const [hireRequests, setHireRequests] = useState([])
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [communicationNote, setCommunicationNote] = useState("")

  // Temporary admin credentials
  const ADMIN_EMAIL = "admin@brainito.com"
  const ADMIN_PASSWORD = "brainito2024"

  useEffect(() => {
    if (isLoggedIn) {
      fetchData()
    }
  }, [isLoggedIn])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/applications")
      const result = await response.json()

      if (result.success) {
        setApplications(result.applications)
        setHireRequests(result.hireRequests)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true)
    } else {
      alert("Invalid credentials. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginData({ email: "", password: "" })
  }

  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/applications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      })

      const result = await response.json()

      if (result.success) {
        setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)))
      }
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  const updateHireRequestStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/hire-requests", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      })

      const result = await response.json()

      if (result.success) {
        setHireRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status } : req)))
      }
    } catch (error) {
      console.error("Error updating hire request status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shortlisted":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3" />
      case "reviewed":
        return <Eye className="w-3 h-3" />
      case "shortlisted":
        return <CheckCircle className="w-3 h-3" />
      case "rejected":
        return <XCircle className="w-3 h-3" />
      case "approved":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.appliedFor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalApplications: applications.length,
    pendingApplications: applications.filter((app) => app.status === "pending").length,
    shortlistedApplications: applications.filter((app) => app.status === "shortlisted").length,
    hireRequests: hireRequests.length,
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border-gray-200">
          <CardHeader className="text-center bg-gray-800 text-white rounded-t-lg">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-800" />
            </div>
            <CardTitle className="text-2xl">Admin Panel</CardTitle>
            <CardDescription className="text-gray-300">Brainito Career Management System</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="admin@brainito.com"
                  className="border-gray-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter password"
                  className="border-gray-300"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                Login to Admin Panel
              </Button>
            </form>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="font-medium">Demo Credentials:</p>
              <p>Email: admin@brainito.com</p>
              <p>Password: brainito2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Brainito Admin</h1>
                <p className="text-sm text-gray-600">Career Management System</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingApplications}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                  <p className="text-3xl font-bold text-green-600">{stats.shortlistedApplications}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hire Requests</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.hireRequests}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
            >
              Job Applications
            </TabsTrigger>
            <TabsTrigger
              value="hire-requests"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
            >
              Hire Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Filters */}
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48 border-gray-300">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Applications Table */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Job Applications</CardTitle>
                <CardDescription className="text-gray-600">Manage and review all job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200">
                        <TableHead className="text-gray-700">Candidate</TableHead>
                        <TableHead className="text-gray-700">Position</TableHead>
                        <TableHead className="text-gray-700">Experience</TableHead>
                        <TableHead className="text-gray-700">Location</TableHead>
                        <TableHead className="text-gray-700">CTC</TableHead>
                        <TableHead className="text-gray-700">Status</TableHead>
                        <TableHead className="text-gray-700">Applied</TableHead>
                        <TableHead className="text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                                  {application.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{application.fullName}</p>
                                <p className="text-sm text-gray-600">{application.currentPosition}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-900">{application.appliedFor}</TableCell>
                          <TableCell className="text-gray-600">{application.totalExperience} years</TableCell>
                          <TableCell className="text-gray-600">{application.currentLocation}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="text-gray-900">₹{application.expectedCTC}</p>
                              <p className="text-gray-500">Expected</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn("border", getStatusColor(application.status))}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                                  onClick={() => setSelectedApplication(application)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                                <DialogHeader>
                                  <DialogTitle className="text-gray-900">Application Details</DialogTitle>
                                  <DialogDescription className="text-gray-600">
                                    Review and manage candidate application
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedApplication && (
                                  <div className="space-y-6">
                                    {/* Candidate Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <Card className="border-gray-200">
                                        <CardHeader className="pb-3">
                                          <CardTitle className="text-lg text-gray-900">Personal Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-900">{selectedApplication.fullName}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">{selectedApplication.email}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">{selectedApplication.phone}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">{selectedApplication.currentLocation}</span>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      <Card className="border-gray-200">
                                        <CardHeader className="pb-3">
                                          <CardTitle className="text-lg text-gray-900">Professional Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                          <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-900">{selectedApplication.currentPosition}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">
                                              {selectedApplication.totalExperience} years experience
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">
                                              ₹{selectedApplication.currentCTC} → ₹{selectedApplication.expectedCTC}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-gray-600">
                                              Notice: {selectedApplication.noticePeriod}
                                            </span>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    {/* Status Management */}
                                    <Card className="border-gray-200">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-lg text-gray-900">Application Management</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                          <Button
                                            size="sm"
                                            variant={selectedApplication.status === "reviewed" ? "default" : "outline"}
                                            onClick={() => updateApplicationStatus(selectedApplication.id, "reviewed")}
                                            className={
                                              selectedApplication.status === "reviewed"
                                                ? "bg-gray-800 text-white"
                                                : "border-gray-300 text-gray-700"
                                            }
                                          >
                                            Mark as Reviewed
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant={
                                              selectedApplication.status === "shortlisted" ? "default" : "outline"
                                            }
                                            onClick={() =>
                                              updateApplicationStatus(selectedApplication.id, "shortlisted")
                                            }
                                            className={
                                              selectedApplication.status === "shortlisted"
                                                ? "bg-green-600 text-white"
                                                : "border-gray-300 text-gray-700"
                                            }
                                          >
                                            Shortlist
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant={selectedApplication.status === "rejected" ? "default" : "outline"}
                                            onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                                            className={
                                              selectedApplication.status === "rejected"
                                                ? "bg-red-600 text-white"
                                                : "border-gray-300 text-gray-700"
                                            }
                                          >
                                            Reject
                                          </Button>
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="communication">Communication Notes</Label>
                                          <Textarea
                                            id="communication"
                                            placeholder="Add notes about communication with this candidate..."
                                            value={communicationNote}
                                            onChange={(e) => setCommunicationNote(e.target.value)}
                                            className="border-gray-300"
                                          />
                                          <Button size="sm" className="bg-gray-800 text-white hover:bg-gray-700">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Save Note
                                          </Button>
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-gray-300 text-gray-700 bg-transparent"
                                          >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download CV
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-gray-300 text-gray-700 bg-transparent"
                                          >
                                            <Mail className="w-4 h-4 mr-2" />
                                            Send Email
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hire-requests" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Client Hire Requests</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage requests from clients to hire our talent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hireRequests.map((request) => (
                    <Card key={request.id} className="border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback className="bg-gray-200 text-gray-700">
                                  {request.clientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold text-gray-900">{request.clientName}</h4>
                                <p className="text-sm text-gray-600">{request.clientEmail}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Employee Requested</p>
                                <p className="font-medium text-gray-900">{request.employeeName}</p>
                                <p className="text-gray-600">{request.position}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Project Details</p>
                                <p className="font-medium text-gray-900">{request.projectType}</p>
                                <p className="text-gray-600">{request.duration}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Budget</p>
                                <p className="font-medium text-gray-900">{request.budget}</p>
                                <p className="text-gray-600">Total project value</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={cn("border", getStatusColor(request.status))}>
                              {getStatusIcon(request.status)}
                              <span className="ml-1 capitalize">{request.status}</span>
                            </Badge>
                            <p className="text-xs text-gray-500">
                              {new Date(request.requestedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4 bg-gray-200" />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateHireRequestStatus(request.id, "approved")}
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateHireRequestStatus(request.id, "rejected")}
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 bg-transparent">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact Client
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
