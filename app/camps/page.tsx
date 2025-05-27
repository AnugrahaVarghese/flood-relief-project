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
import { MapPin, Plus, Search, Edit, Trash2, ArrowLeft, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function CampsPage() {
  const [camps, setCamps] = useState([
    {
      id: 1,
      name: "Kochi Relief Camp",
      location: "Kochi, Kerala",
      capacity: 500,
      occupied: 387,
      status: "Active",
      coordinator: "Anjana R Nair",
      facilities: ["Medical", "Food", "Shelter"],
    },
    {
      id: 2,
      name: "Alappuzha Camp",
      location: "Alappuzha, Kerala",
      capacity: 300,
      occupied: 245,
      status: "Active",
      coordinator: "Anugraha Varghese",
      facilities: ["Food", "Shelter", "Sanitation"],
    },
    {
      id: 3,
      name: "Thrissur Camp",
      location: "Thrissur, Kerala",
      capacity: 400,
      occupied: 156,
      status: "Active",
      coordinator: "Arjun M P",
      facilities: ["Medical", "Food", "Shelter", "Education"],
    },
    {
      id: 4,
      name: "Ernakulam Camp",
      location: "Ernakulam, Kerala",
      capacity: 250,
      occupied: 234,
      status: "Near Full",
      coordinator: "Ardra Sujith",
      facilities: ["Medical", "Food", "Shelter"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCamp, setNewCamp] = useState({
    name: "",
    location: "",
    capacity: "",
    coordinator: "",
    facilities: [],
  })

  const filteredCamps = camps.filter(
    (camp) =>
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.coordinator.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCamp = () => {
    if (newCamp.name && newCamp.location && newCamp.capacity && newCamp.coordinator) {
      setCamps([
        ...camps,
        {
          id: camps.length + 1,
          ...newCamp,
          capacity: Number.parseInt(newCamp.capacity),
          occupied: 0,
          status: "Active",
          facilities: newCamp.facilities,
        },
      ])
      setNewCamp({ name: "", location: "", capacity: "", coordinator: "", facilities: [] })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteCamp = (id: number) => {
    setCamps(camps.filter((camp) => camp.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Near Full":
        return "destructive"
      case "Inactive":
        return "secondary"
      default:
        return "default"
    }
  }

  const getOccupancyColor = (occupied: number, capacity: number) => {
    const percentage = (occupied / capacity) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 75) return "text-orange-600"
    return "text-green-600"
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
                <MapPin className="h-6 w-6" />
                Camp Management
              </h1>
              <p className="text-gray-600">Manage relief camps and their operations</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Camp
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Register New Relief Camp</DialogTitle>
                <DialogDescription>Add a new relief camp to the management system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="camp-name">Camp Name</Label>
                  <Input
                    id="camp-name"
                    value={newCamp.name}
                    onChange={(e) => setNewCamp({ ...newCamp, name: e.target.value })}
                    placeholder="Enter camp name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newCamp.location}
                    onChange={(e) => setNewCamp({ ...newCamp, location: e.target.value })}
                    placeholder="Enter camp location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newCamp.capacity}
                    onChange={(e) => setNewCamp({ ...newCamp, capacity: e.target.value })}
                    placeholder="Enter maximum capacity"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinator">Camp Coordinator</Label>
                  <Select
                    value={newCamp.coordinator}
                    onValueChange={(value) => setNewCamp({ ...newCamp, coordinator: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select coordinator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Anjana R Nair">Anjana R Nair</SelectItem>
                      <SelectItem value="Anugraha Varghese">Anugraha Varghese</SelectItem>
                      <SelectItem value="Arjun M P">Arjun M P</SelectItem>
                      <SelectItem value="Ardra Sujith">Ardra Sujith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddCamp} className="w-full">
                  Register Camp
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Camps</CardTitle>
              <MapPin className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{camps.length}</div>
              <p className="text-xs text-muted-foreground">Active relief camps</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{camps.reduce((sum, camp) => sum + camp.capacity, 0)}</div>
              <p className="text-xs text-muted-foreground">Maximum people</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{camps.reduce((sum, camp) => sum + camp.occupied, 0)}</div>
              <p className="text-xs text-muted-foreground">People sheltered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Near Full</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {camps.filter((camp) => camp.occupied / camp.capacity >= 0.9).length}
              </div>
              <p className="text-xs text-muted-foreground">Camps at 90%+ capacity</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Camps</CardTitle>
            <CardDescription>Find camps by name, location, or coordinator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search camps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Camps Table */}
        <Card>
          <CardHeader>
            <CardTitle>Relief Camps ({filteredCamps.length})</CardTitle>
            <CardDescription>List of all registered relief camps</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Camp Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Coordinator</TableHead>
                  <TableHead>Facilities</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCamps.map((camp) => (
                  <TableRow key={camp.id}>
                    <TableCell className="font-medium">{camp.name}</TableCell>
                    <TableCell>{camp.location}</TableCell>
                    <TableCell>
                      <div className={`font-medium ${getOccupancyColor(camp.occupied, camp.capacity)}`}>
                        {camp.occupied}/{camp.capacity}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.round((camp.occupied / camp.capacity) * 100)}% full
                      </div>
                    </TableCell>
                    <TableCell>{camp.coordinator}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {camp.facilities.slice(0, 2).map((facility, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {camp.facilities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{camp.facilities.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(camp.status)}>{camp.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCamp(camp.id)}
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
