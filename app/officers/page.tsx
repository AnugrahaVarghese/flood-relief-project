"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Plus, Search, Edit, Trash2, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function OfficersPage() {
  const [officers, setOfficers] = useState([
    {
      id: 1,
      name: "Aravind G Pillai",
      email: "aravind.pillai@floodcare.org",
      phone: "+91 9876543214",
      role: "District Coordinator",
      department: "Emergency Response",
      assignedArea: "Kochi District",
      status: "Active",
      experience: "5 years",
    },
    {
      id: 2,
      name: "Ardra Sujith",
      email: "ardra.sujith@floodcare.org",
      phone: "+91 9876543215",
      role: "Camp Manager",
      department: "Camp Operations",
      assignedArea: "Ernakulam Camp",
      status: "Active",
      experience: "3 years",
    },
    {
      id: 3,
      name: "Arjun M P",
      email: "arjun.mp@floodcare.org",
      phone: "+91 9876543216",
      role: "Medical Officer",
      department: "Health Services",
      assignedArea: "Thrissur Region",
      status: "On Leave",
      experience: "7 years",
    },
    {
      id: 4,
      name: "Anuja J Jose",
      email: "anuja.jose@floodcare.org",
      phone: "+91 9876543217",
      role: "Logistics Coordinator",
      department: "Supply Chain",
      assignedArea: "Alappuzha District",
      status: "Active",
      experience: "4 years",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    assignedArea: "",
    experience: "",
  })

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.assignedArea.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddOfficer = () => {
    if (
      newOfficer.name &&
      newOfficer.email &&
      newOfficer.phone &&
      newOfficer.role &&
      newOfficer.department &&
      newOfficer.assignedArea
    ) {
      setOfficers([
        ...officers,
        {
          id: officers.length + 1,
          ...newOfficer,
          status: "Active",
        },
      ])
      setNewOfficer({ name: "", email: "", phone: "", role: "", department: "", assignedArea: "", experience: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteOfficer = (id: number) => {
    setOfficers(officers.filter((officer) => officer.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "On Leave":
        return "secondary"
      case "Inactive":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Officer Management
              </h1>
              <p className="text-gray-600">Manage relief officers and their assignments</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Officer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Officer</DialogTitle>
                <DialogDescription>Register a new relief officer in the system.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="officer-name">Full Name</Label>
                  <Input
                    id="officer-name"
                    value={newOfficer.name}
                    onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officer-email">Email</Label>
                  <Input
                    id="officer-email"
                    type="email"
                    value={newOfficer.email}
                    onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officer-phone">Phone Number</Label>
                  <Input
                    id="officer-phone"
                    value={newOfficer.phone}
                    onChange={(e) => setNewOfficer({ ...newOfficer, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officer-role">Role</Label>
                  <Select
                    value={newOfficer.role}
                    onValueChange={(value) => setNewOfficer({ ...newOfficer, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="District Coordinator">District Coordinator</SelectItem>
                      <SelectItem value="Camp Manager">Camp Manager</SelectItem>
                      <SelectItem value="Medical Officer">Medical Officer</SelectItem>
                      <SelectItem value="Logistics Coordinator">Logistics Coordinator</SelectItem>
                      <SelectItem value="Security Officer">Security Officer</SelectItem>
                      <SelectItem value="Communications Officer">Communications Officer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officer-department">Department</Label>
                  <Select
                    value={newOfficer.department}
                    onValueChange={(value) => setNewOfficer({ ...newOfficer, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency Response">Emergency Response</SelectItem>
                      <SelectItem value="Camp Operations">Camp Operations</SelectItem>
                      <SelectItem value="Health Services">Health Services</SelectItem>
                      <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Communications">Communications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assigned-area">Assigned Area</Label>
                  <Input
                    id="assigned-area"
                    value={newOfficer.assignedArea}
                    onChange={(e) => setNewOfficer({ ...newOfficer, assignedArea: e.target.value })}
                    placeholder="Enter assigned area"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={newOfficer.experience}
                    onChange={(e) => setNewOfficer({ ...newOfficer, experience: e.target.value })}
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>
              <Button onClick={handleAddOfficer} className="w-full mt-4">
                Add Officer
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Officers</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officers.length}</div>
              <p className="text-xs text-muted-foreground">Registered officers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {officers.filter((officer) => officer.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently on duty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Shield className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(officers.map((officer) => officer.department)).size}</div>
              <p className="text-xs text-muted-foreground">Different departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {officers.filter((officer) => officer.status === "On Leave").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently unavailable</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Officers</CardTitle>
            <CardDescription>Find officers by name, role, or assigned area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search officers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Officers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Relief Officers ({filteredOfficers.length})</CardTitle>
            <CardDescription>List of all registered relief officers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Assigned Area</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOfficers.map((officer) => (
                  <TableRow key={officer.id}>
                    <TableCell className="font-medium">{officer.name}</TableCell>
                    <TableCell>{officer.role}</TableCell>
                    <TableCell>{officer.department}</TableCell>
                    <TableCell>{officer.assignedArea}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">{officer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{officer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{officer.experience}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(officer.status)}>{officer.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteOfficer(officer.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
