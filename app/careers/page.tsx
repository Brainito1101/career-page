"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload,
  MapPin,
  Clock,
  Briefcase,
  ChevronDown,
  User,
  Send,
  CheckCircle,
  Users,
  Star,
  Award,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"

const jobOpenings = [
  {
    id: 1,
    title: "Digital Marketing Manager",
    location: "Ahmedabad",
    experience: "3-5 years",
    type: "Full-time",
    description:
      "Lead our digital marketing initiatives including SEO, SEM, social media marketing, and content strategy. Drive growth through data-driven marketing campaigns.",
    requirements: [
      "3+ years in digital marketing",
      "Experience with Google Ads, Facebook Ads",
      "Strong analytical skills",
      "Content marketing experience",
    ],
  },
  {
    id: 2,
    title: "Content Writer & Strategist",
    location: "Ahmedabad / Remote",
    experience: "2-4 years",
    type: "Full-time",
    description:
      "Create compelling content across multiple channels. Develop content strategies that align with business objectives and engage target audiences.",
    requirements: [
      "Excellent writing and editing skills",
      "SEO content optimization",
      "Social media content experience",
      "Brand voice development",
    ],
  },
  {
    id: 3,
    title: "Social Media Manager",
    location: "Ahmedabad",
    experience: "2-3 years",
    type: "Full-time",
    description:
      "Manage and grow our social media presence across platforms. Create engaging content and build community around our brand.",
    requirements: [
      "Social media platform expertise",
      "Content creation skills",
      "Community management",
      "Analytics and reporting",
    ],
  },
  {
    id: 4,
    title: "SEO Specialist",
    location: "Ahmedabad",
    experience: "2-4 years",
    type: "Full-time",
    description:
      "Optimize our web presence for search engines. Conduct keyword research, technical SEO audits, and implement SEO strategies.",
    requirements: [
      "Technical SEO expertise",
      "Keyword research tools",
      "Google Analytics & Search Console",
      "Link building strategies",
    ],
  },
  {
    id: 5,
    title: "Graphic Designer",
    location: "Ahmedabad",
    experience: "1-3 years",
    type: "Full-time",
    description:
      "Create visually stunning designs for digital and print media. Work on brand identity, marketing materials, and web graphics.",
    requirements: [
      "Adobe Creative Suite proficiency",
      "Brand design experience",
      "Web design skills",
      "Print design knowledge",
    ],
  },
]

const availableEmployees = [
  {
    id: 1,
    name: "Priya S.",
    position: "Senior Digital Marketing Manager",
    experience: "5+ years",
    skills: ["Google Ads", "Facebook Ads", "SEO", "Analytics", "Content Strategy"],
    rating: 4.9,
    projectsCompleted: 45,
    availability: "Available",
    specialization: "Performance Marketing",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Rahul M.",
    position: "SEO Specialist",
    experience: "4+ years",
    skills: ["Technical SEO", "Keyword Research", "Link Building", "Google Analytics", "Search Console"],
    rating: 4.8,
    projectsCompleted: 38,
    availability: "Available",
    specialization: "Technical SEO",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Sneha K.",
    position: "Content Strategist",
    experience: "3+ years",
    skills: ["Content Writing", "Blog Strategy", "Social Media", "Email Marketing", "Brand Voice"],
    rating: 4.9,
    projectsCompleted: 52,
    availability: "Available",
    specialization: "Content Marketing",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Arjun P.",
    position: "Social Media Manager",
    experience: "3+ years",
    skills: ["Instagram", "LinkedIn", "Facebook", "Content Creation", "Community Management"],
    rating: 4.7,
    projectsCompleted: 41,
    availability: "Busy until Feb 2025",
    specialization: "Social Media Growth",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Kavya R.",
    position: "Graphic Designer",
    experience: "4+ years",
    skills: ["Adobe Creative Suite", "Brand Design", "Web Graphics", "Print Design", "UI/UX"],
    rating: 4.8,
    projectsCompleted: 67,
    availability: "Available",
    specialization: "Brand Identity",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Vikram T.",
    position: "PPC Specialist",
    experience: "3+ years",
    skills: ["Google Ads", "Bing Ads", "Campaign Optimization", "Conversion Tracking", "A/B Testing"],
    rating: 4.6,
    projectsCompleted: 33,
    availability: "Available",
    specialization: "Paid Advertising",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    currentPosition: "",
    totalExperience: "",
    currentLocation: "",
    relocateToAhmedabad: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    cv: null as File | null,
  })

  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const profileRef = useRef<HTMLDivElement>(null)
  const jobsRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.currentPosition.trim()) newErrors.currentPosition = "Current position is required"
    if (!formData.totalExperience) newErrors.totalExperience = "Experience is required"
    if (!formData.currentLocation.trim()) newErrors.currentLocation = "Current location is required"
    if (!formData.relocateToAhmedabad) newErrors.relocateToAhmedabad = "Please select relocation preference"
    if (!formData.noticePeriod) newErrors.noticePeriod = "Notice period is required"
    if (!formData.currentCTC.trim()) newErrors.currentCTC = "Current CTC is required"
    if (!formData.expectedCTC.trim()) newErrors.expectedCTC = "Expected CTC is required"
    if (!formData.cv) newErrors.cv = "CV upload is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        // Create FormData for file upload
        const submitData = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null) {
            submitData.append(key, value)
          }
        })

        // Add additional fields
        submitData.append("email", "candidate@example.com") // You might want to add email field to form
        submitData.append("phone", "+91 9876543210") // You might want to add phone field to form
        if (selectedJob) {
          const job = jobOpenings.find((j) => j.id === selectedJob)
          submitData.append("appliedFor", job?.title || "General Application")
        }

        // Send to API
        const response = await fetch("/api/applications", {
          method: "POST",
          body: submitData,
        })

        const result = await response.json()

        if (result.success) {
          console.log("✅ Application submitted successfully:", result.application)
          setIsSubmitted(true)

          // Reset form after 3 seconds
          setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
              fullName: "",
              currentPosition: "",
              totalExperience: "",
              currentLocation: "",
              relocateToAhmedabad: "",
              noticePeriod: "",
              currentCTC: "",
              expectedCTC: "",
              cv: null,
            })
            setSelectedJob(null)
          }, 3000)
        } else {
          console.error("❌ Failed to submit application:", result.message)
          alert("Failed to submit application. Please try again.")
        }
      } catch (error) {
        console.error("❌ Error submitting form:", error)
        alert("An error occurred. Please try again.")
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, cv: "File size must be less than 5MB" })
        return
      }
      if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      ) {
        setErrors({ ...errors, cv: "Only PDF and DOC files are allowed" })
        return
      }
      setFormData({ ...formData, cv: file })
      setErrors({ ...errors, cv: "" })
    }
  }

  const applyForJob = (jobId: number) => {
    setSelectedJob(jobId)
    profileRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleEmployeeSelect = (employeeId: number) => {
    setSelectedEmployee(selectedEmployee === employeeId ? null : employeeId)
  }

  const handleHireEmployee = async (employee: any) => {
    try {
      const hireRequestData = {
        employeeName: employee.name,
        position: employee.position,
        projectType: "Digital Marketing Project",
        duration: "3-6 months",
        budget: "₹5,00,000 - ₹10,00,000",
        clientName: "Interested Client",
        clientEmail: "client@example.com",
      }

      const response = await fetch("/api/hire-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hireRequestData),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Hire request sent for ${employee.name}. We'll contact you shortly!`)
      } else {
        alert("Failed to send hire request. Please try again.")
      }
    } catch (error) {
      console.error("Error sending hire request:", error)
      alert("An error occurred. Please try again.")
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#71389A] via-[#8B4CB8] to-[#A569D1] flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in joining Brainito. We'll review your application and get back to you soon.
            </p>
            <p className="text-sm text-gray-500">A copy has been sent to accounts@brainito.com</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#71389A] via-[#8B4CB8] to-[#A569D1]">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Brainito</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Be part of our innovative team where creativity meets technology. Help us build the future of digital
              marketing solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Navigation */}
          <div className="xl:w-80 order-1 xl:order-1">
            <div className="sticky top-8 space-y-6">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#71389A] to-[#8B4CB8] text-white rounded-t-lg">
                  <CardTitle className="text-lg">Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-[#71389A]/10 hover:text-[#71389A] transition-all"
                      onClick={() => scrollToSection(profileRef)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Profile & CV
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-[#71389A]/10 hover:text-[#71389A] transition-all"
                      onClick={() => scrollToSection(jobsRef)}
                    >
                      <Briefcase className="w-4 h-4 mr-3" />
                      Job Openings ({jobOpenings.length})
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left hover:bg-[#71389A]/10 hover:text-[#71389A] transition-all"
                      onClick={() => scrollToSection(clientRef)}
                    >
                      <Users className="w-4 h-4 mr-3" />
                      Hire Our Talent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Company Info Card */}
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#71389A] to-[#8B4CB8] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">B</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Why Choose Brainito?</h3>
                    <ul className="text-sm text-gray-600 space-y-2 text-left">
                      <li>• Innovative work environment</li>
                      <li>• Competitive compensation</li>
                      <li>• Growth opportunities</li>
                      <li>• Flexible work arrangements</li>
                      <li>• Learning & development programs</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 order-2 xl:order-2 space-y-8">
            {/* Profile Form Section */}
            <div ref={profileRef}>
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-[#71389A] to-[#8B4CB8] text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="w-6 h-6" />
                    Submit Your Profile
                  </CardTitle>
                  <CardDescription className="text-white/90">
                    {selectedJob
                      ? `Applying for: ${jobOpenings.find((job) => job.id === selectedJob)?.title}`
                      : "Tell us about yourself and join our team"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={cn("transition-all", errors.fullName && "border-red-500")}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentPosition">Current Position *</Label>
                        <Input
                          id="currentPosition"
                          value={formData.currentPosition}
                          onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                          className={cn("transition-all", errors.currentPosition && "border-red-500")}
                          placeholder="e.g., Digital Marketing Manager"
                        />
                        {errors.currentPosition && <p className="text-red-500 text-sm">{errors.currentPosition}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="totalExperience">Total Experience (Digital Marketing) *</Label>
                        <Select
                          value={formData.totalExperience}
                          onValueChange={(value) => setFormData({ ...formData, totalExperience: value })}
                        >
                          <SelectTrigger className={cn("transition-all", errors.totalExperience && "border-red-500")}>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="2-3">2-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-7">5-7 years</SelectItem>
                            <SelectItem value="7+">7+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.totalExperience && <p className="text-red-500 text-sm">{errors.totalExperience}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentLocation">Current Location *</Label>
                        <Input
                          id="currentLocation"
                          value={formData.currentLocation}
                          onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                          className={cn("transition-all", errors.currentLocation && "border-red-500")}
                          placeholder="e.g., Mumbai, Delhi"
                        />
                        {errors.currentLocation && <p className="text-red-500 text-sm">{errors.currentLocation}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currentCTC">Current CTC (₹) *</Label>
                        <Input
                          id="currentCTC"
                          value={formData.currentCTC}
                          onChange={(e) => setFormData({ ...formData, currentCTC: e.target.value })}
                          className={cn("transition-all", errors.currentCTC && "border-red-500")}
                          placeholder="e.g., 5,00,000"
                        />
                        {errors.currentCTC && <p className="text-red-500 text-sm">{errors.currentCTC}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectedCTC">Expected CTC (₹) *</Label>
                        <Input
                          id="expectedCTC"
                          value={formData.expectedCTC}
                          onChange={(e) => setFormData({ ...formData, expectedCTC: e.target.value })}
                          className={cn("transition-all", errors.expectedCTC && "border-red-500")}
                          placeholder="e.g., 7,00,000"
                        />
                        {errors.expectedCTC && <p className="text-red-500 text-sm">{errors.expectedCTC}</p>}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Willing to Relocate to Ahmedabad? *</Label>
                        <RadioGroup
                          value={formData.relocateToAhmedabad}
                          onValueChange={(value) => setFormData({ ...formData, relocateToAhmedabad: value })}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="relocate-yes" />
                            <Label htmlFor="relocate-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="relocate-no" />
                            <Label htmlFor="relocate-no">No</Label>
                          </div>
                        </RadioGroup>
                        {errors.relocateToAhmedabad && (
                          <p className="text-red-500 text-sm">{errors.relocateToAhmedabad}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="noticePeriod">Notice Period *</Label>
                        <Select
                          value={formData.noticePeriod}
                          onValueChange={(value) => setFormData({ ...formData, noticePeriod: value })}
                        >
                          <SelectTrigger className={cn("transition-all", errors.noticePeriod && "border-red-500")}>
                            <SelectValue placeholder="Select notice period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="15-days">15 Days</SelectItem>
                            <SelectItem value="30-days">30 Days</SelectItem>
                            <SelectItem value="60-days">60 Days</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.noticePeriod && <p className="text-red-500 text-sm">{errors.noticePeriod}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cv">Upload CV/Resume * (PDF/DOC, Max 5MB)</Label>
                        <div
                          className={cn(
                            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all hover:border-[#71389A] hover:bg-purple-50",
                            errors.cv && "border-red-500",
                            formData.cv && "border-green-500 bg-green-50",
                          )}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {formData.cv ? formData.cv.name : "Click or drag a file to this area to upload"}
                          </p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                        {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#71389A] to-[#8B4CB8] hover:from-[#5F2D85] hover:to-[#71389A] text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Job Openings Section */}
            <div ref={jobsRef}>
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-[#71389A] to-[#8B4CB8] text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Briefcase className="w-6 h-6" />
                    Current Openings
                  </CardTitle>
                  <CardDescription className="text-white/90">
                    Explore exciting opportunities to grow your career with us
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {jobOpenings.map((job) => (
                      <Collapsible key={job.id}>
                        <Card className="border border-gray-200 hover:border-[#71389A] transition-all duration-300 hover:shadow-lg">
                          <CollapsibleTrigger className="w-full">
                            <CardHeader className="hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="text-left">
                                  <CardTitle className="text-lg text-[#71389A] mb-2">{job.title}</CardTitle>
                                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {job.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {job.experience}
                                    </div>
                                    <Badge variant="secondary">{job.type}</Badge>
                                  </div>
                                </div>
                                <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                              </div>
                            </CardHeader>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                                  <p className="text-gray-600">{job.description}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    {job.requirements.map((req, index) => (
                                      <li key={index}>{req}</li>
                                    ))}
                                  </ul>
                                </div>
                                <Button
                                  onClick={() => applyForJob(job.id)}
                                  className="bg-gradient-to-r from-[#71389A] to-[#8B4CB8] hover:from-[#5F2D85] hover:to-[#71389A] text-white transition-all duration-300"
                                >
                                  Apply Now
                                </Button>
                              </div>
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Client Display Section */}
          <div className="xl:w-96 order-3 xl:order-3">
            <div ref={clientRef} className="sticky top-8">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[#71389A] to-[#8B4CB8] text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Users className="w-5 h-5" />
                    Hire Our Talent
                  </CardTitle>
                  <CardDescription className="text-white/90">
                    Select and hire our skilled professionals directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 max-h-[800px] overflow-y-auto">
                  <div className="space-y-4">
                    {availableEmployees.map((employee) => (
                      <Card
                        key={employee.id}
                        className={cn(
                          "border transition-all duration-300 cursor-pointer hover:shadow-md",
                          selectedEmployee === employee.id
                            ? "border-[#71389A] bg-purple-50"
                            : "border-gray-200 hover:border-[#71389A]/50",
                        )}
                        onClick={() => handleEmployeeSelect(employee.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                              <AvatarFallback className="bg-[#71389A] text-white">
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-900 text-sm truncate">{employee.name}</h4>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-gray-600">{employee.rating}</span>
                                </div>
                              </div>
                              <p className="text-xs text-[#71389A] font-medium mb-1">{employee.position}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {employee.experience}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  {employee.projectsCompleted} projects
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {employee.skills.slice(0, 3).map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                    {skill}
                                  </Badge>
                                ))}
                                {employee.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    {"+" + (employee.skills.length - 3)}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <Button
                                  onClick={() => handleHireEmployee(employee)}
                                  className="bg-gradient-to-r from-[#71389A] to-[#8B4CB8] hover:from-[#5F2D85] hover:to-[#71389A] text-white transition-all duration-300"
                                >
                                  Hire Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
