"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Package, AlertTriangle, TrendingUp, Activity, LogOut, Settings, Bell } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  const stats = [
    {
      title: "Active Relief Camps",
      value: "24",
      change: "+3 this week",
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      title: "People Assisted",
      value: "1,247",
      change: "+89 today",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Resources Distributed",
      value: "5,432",
      change: "+234 today",
      icon: Package,
      color: "text-orange-600",
    },
    {
      title: "Pending Requests",
      value: "18",
      change: "-5 from yesterday",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const recentActivities = [
    { action: "New relief camp registered", location: "Kochi District", time: "2 hours ago", type: "camp" },
    { action: "Resource request fulfilled", location: "Alappuzha Camp", time: "4 hours ago", type: "resource" },
    { action: "New officer assigned", location: "Thrissur Region", time: "6 hours ago", type: "officer" },
    { action: "Emergency supplies delivered", location: "Ernakulam Camp", time: "8 hours ago", type: "delivery" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="capitalize">
              {user.role}
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/users">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/camps">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Manage Camps
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Resource Allocation
                </Button>
              </Link>
              <Link href="/officers">
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Officer Management
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from relief operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      {activity.type === "camp" && <MapPin className="h-5 w-5 text-blue-600" />}
                      {activity.type === "resource" && <Package className="h-5 w-5 text-green-600" />}
                      {activity.type === "officer" && <Users className="h-5 w-5 text-orange-600" />}
                      {activity.type === "delivery" && <TrendingUp className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.location}</p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Alert */}
        <Card className="mt-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">
              Current flood warning level: <strong>MODERATE</strong> - Continue monitoring affected areas and maintain
              readiness for resource deployment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
