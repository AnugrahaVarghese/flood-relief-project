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
import { Package, Plus, Search, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const [resources, setResources] = useState([
    {
      id: 1,
      item: "Food Packets",
      quantity: 1500,
      unit: "packets",
      camp: "Kochi Relief Camp",
      status: "Available",
      priority: "High",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      item: "Water Bottles",
      quantity: 2000,
      unit: "bottles",
      camp: "Alappuzha Camp",
      status: "Low Stock",
      priority: "Critical",
      lastUpdated: "2024-01-15",
    },
    {
      id: 3,
      item: "Medical Supplies",
      quantity: 50,
      unit: "kits",
      camp: "Thrissur Camp",
      status: "Available",
      priority: "High",
      lastUpdated: "2024-01-14",
    },
    {
      id: 4,
      item: "Blankets",
      quantity: 300,
      unit: "pieces",
      camp: "Ernakulam Camp",
      status: "Out of Stock",
      priority: "Critical",
      lastUpdated: "2024-01-13",
    },
    {
      id: 5,
      item: "Clothing",
      quantity: 800,
      unit: "sets",
      camp: "Kochi Relief Camp",
      status: "Available",
      priority: "Medium",
      lastUpdated: "2024-01-15",
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      item: "Food Packets",
      quantity: 500,
      camp: "Alappuzha Camp",
      status: "Pending",
      requestDate: "2024-01-15",
    },
    {
      id: 2,
      item: "Water Bottles",
      quantity: 1000,
      camp: "Thrissur Camp",
      status: "In Transit",
      requestDate: "2024-01-14",
    },
    { id: 3, item: "Blankets", quantity: 200, camp: "Ernakulam Camp", status: "Delivered", requestDate: "2024-01-13" },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [newResource, setNewResource] = useState({
    item: "",
    quantity: "",
    unit: "",
    camp: "",
    priority: "",
  })
  const [newOrder, setNewOrder] = useState({
    item: "",
    quantity: "",
    camp: "",
  })

  const filteredResources = resources.filter(
    (resource) =>
      resource.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.camp.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddResource = () => {
    if (newResource.item && newResource.quantity && newResource.unit && newResource.camp && newResource.priority) {
      setResources([
        ...resources,
        {
          id: resources.length + 1,
          ...newResource,
          quantity: Number.parseInt(newResource.quantity),
          status: "Available",
          lastUpdated: new Date().toISOString().split("T")[0],
        },
      ])
      setNewResource({ item: "", quantity: "", unit: "", camp: "", priority: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handlePlaceOrder = () => {
    if (newOrder.item && newOrder.quantity && newOrder.camp) {
      setOrders([
        ...orders,
        {
          id: orders.length + 1,
          ...newOrder,
          quantity: Number.parseInt(newOrder.quantity),
          status: "Pending",
          requestDate: new Date().toISOString().split("T")[0],
        },
      ])
      setNewOrder({ item: "", quantity: "", camp: "" })
      setIsOrderDialogOpen(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "default"
      case "Low Stock":
        return "destructive"
      case "Out of Stock":
        return "secondary"
      case "Pending":
        return "destructive"
      case "In Transit":
        return "default"
      case "Delivered":
        return "default"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "text-red-600"
      case "High":
        return "text-orange-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
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
                <Package className="h-6 w-6" />
                Resource Management
              </h1>
              <p className="text-gray-600">Manage and track essential supplies for relief operations</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Place Order
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Place Resource Order</DialogTitle>
                  <DialogDescription>Request resources for a relief camp.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="order-item">Resource Item</Label>
                    <Select value={newOrder.item} onValueChange={(value) => setNewOrder({ ...newOrder, item: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food Packets">Food Packets</SelectItem>
                        <SelectItem value="Water Bottles">Water Bottles</SelectItem>
                        <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                        <SelectItem value="Blankets">Blankets</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-quantity">Quantity</Label>
                    <Input
                      id="order-quantity"
                      type="number"
                      value={newOrder.quantity}
                      onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                      placeholder="Enter quantity needed"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-camp">Destination Camp</Label>
                    <Select value={newOrder.camp} onValueChange={(value) => setNewOrder({ ...newOrder, camp: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select camp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kochi Relief Camp">Kochi Relief Camp</SelectItem>
                        <SelectItem value="Alappuzha Camp">Alappuzha Camp</SelectItem>
                        <SelectItem value="Thrissur Camp">Thrissur Camp</SelectItem>
                        <SelectItem value="Ernakulam Camp">Ernakulam Camp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handlePlaceOrder} className="w-full">
                    Place Order
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>Add a new resource to the inventory system.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-item">Resource Item</Label>
                    <Input
                      id="resource-item"
                      value={newResource.item}
                      onChange={(e) => setNewResource({ ...newResource, item: e.target.value })}
                      placeholder="Enter resource name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newResource.quantity}
                        onChange={(e) => setNewResource({ ...newResource, quantity: e.target.value })}
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        value={newResource.unit}
                        onValueChange={(value) => setNewResource({ ...newResource, unit: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="packets">Packets</SelectItem>
                          <SelectItem value="bottles">Bottles</SelectItem>
                          <SelectItem value="kits">Kits</SelectItem>
                          <SelectItem value="pieces">Pieces</SelectItem>
                          <SelectItem value="sets">Sets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-camp">Camp</Label>
                    <Select
                      value={newResource.camp}
                      onValueChange={(value) => setNewResource({ ...newResource, camp: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select camp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kochi Relief Camp">Kochi Relief Camp</SelectItem>
                        <SelectItem value="Alappuzha Camp">Alappuzha Camp</SelectItem>
                        <SelectItem value="Thrissur Camp">Thrissur Camp</SelectItem>
                        <SelectItem value="Ernakulam Camp">Ernakulam Camp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newResource.priority}
                      onValueChange={(value) => setNewResource({ ...newResource, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddResource} className="w-full">
                    Add Resource
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resources.length}</div>
              <p className="text-xs text-muted-foreground">Different resource types</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resources.filter((r) => r.status === "Low Stock" || r.status === "Out of Stock").length}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "Pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status === "Delivered").length}</div>
              <p className="text-xs text-muted-foreground">Completed orders</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Resources</CardTitle>
            <CardDescription>Find resources by item name or camp location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Resources Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Inventory ({filteredResources.length})</CardTitle>
              <CardDescription>Current stock levels across all camps</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Camp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell className="font-medium">{resource.item}</TableCell>
                      <TableCell>
                        {resource.quantity} {resource.unit}
                      </TableCell>
                      <TableCell className="text-sm">{resource.camp}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(resource.status)}>{resource.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getPriorityColor(resource.priority)}`}>
                          {resource.priority}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders ({orders.length})</CardTitle>
              <CardDescription>Track resource requests and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Camp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.item}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="text-sm">{order.camp}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{order.requestDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
