"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import {
  Settings,
  User,
  Code2,
  Briefcase,
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  LogOut,
  Upload,
  Star,
  Calendar,
} from "lucide-react"

// Mock data - in real app this would come from database/localStorage
const initialData = {
  profile: {
    name: "Alex Rodriguez",
    title: "Full Stack Developer",
    bio: "Desarrollador apasionado con 5+ años de experiencia creando soluciones web modernas y escalables. Especializado en React, Node.js y arquitecturas cloud.",
    location: "Madrid, España",
    email: "alex@example.com",
    phone: "+34 123 456 789",
    avatar: "/professional-developer-avatar.png",
  },
  technologies: [
    { id: 1, name: "React", level: 95, category: "Frontend", color: "bg-blue-500" },
    { id: 2, name: "TypeScript", level: 90, category: "Language", color: "bg-blue-600" },
    { id: 3, name: "Node.js", level: 88, category: "Backend", color: "bg-green-600" },
    { id: 4, name: "Next.js", level: 92, category: "Framework", color: "bg-gray-800" },
    { id: 5, name: "PostgreSQL", level: 85, category: "Database", color: "bg-blue-700" },
    { id: 6, name: "AWS", level: 80, category: "Cloud", color: "bg-orange-500" },
    { id: 7, name: "Docker", level: 82, category: "DevOps", color: "bg-blue-400" },
    { id: 8, name: "Python", level: 78, category: "Language", color: "bg-yellow-500" },
  ],
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Plataforma completa de comercio electrónico con panel de administración, pagos integrados y analytics en tiempo real.",
      image: "/modern-ecommerce-dashboard.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Aplicación de gestión de tareas con colaboración en tiempo real, notificaciones push y sincronización offline.",
      image: "/task-management-interface.png",
      technologies: ["Next.js", "TypeScript", "Supabase", "PWA"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Analytics Dashboard",
      description:
        "Dashboard interactivo para análisis de datos meteorológicos con visualizaciones avanzadas y predicciones ML.",
      image: "/weather-analytics-dashboard.jpg",
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
    },
    {
      id: 4,
      title: "Social Media Scheduler",
      description:
        "Herramienta para programar y gestionar contenido en múltiples redes sociales con analytics integrados.",
      image: "/social-media-scheduler.jpg",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false,
    },
  ],
  experience: [
    {
      id: 1,
      company: "TechCorp Solutions",
      position: "Senior Full Stack Developer",
      period: "2022 - Presente",
      description:
        "Lidero el desarrollo de aplicaciones web escalables, mentorizo desarrolladores junior y optimizo arquitecturas cloud.",
    },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Frontend Developer",
      period: "2020 - 2022",
      description:
        "Desarrollé interfaces de usuario modernas y responsivas, implementé sistemas de design systems y mejoré la UX.",
    },
    {
      id: 3,
      company: "Digital Agency",
      position: "Web Developer",
      period: "2019 - 2020",
      description:
        "Creé sitios web corporativos y e-commerce, trabajé con clientes directamente y mantuve múltiples proyectos.",
    },
  ],
}

function AdminDashboardContent() {
  const { user, logout } = useAuth()
  const [data, setData] = useState(initialData)
  const [activeTab, setActiveTab] = useState("profile")
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Save data to localStorage
  const saveData = () => {
    localStorage.setItem("portfolioData", JSON.stringify(data))
    // In real app, this would save to database
    console.log("Data saved:", data)
  }

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  const handleProfileUpdate = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }))
  }

  const handleTechnologyAdd = (tech: any) => {
    const newTech = { ...tech, id: Date.now() }
    setData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, newTech],
    }))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleTechnologyUpdate = (id: number, updatedTech: any) => {
    setData((prev) => ({
      ...prev,
      technologies: prev.technologies.map((tech) => (tech.id === id ? { ...tech, ...updatedTech } : tech)),
    }))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleTechnologyDelete = (id: number) => {
    setData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech.id !== id),
    }))
  }

  const handleProjectAdd = (project: any) => {
    const newProject = { ...project, id: Date.now() }
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleProjectUpdate = (id: number, updatedProject: any) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, ...updatedProject } : project)),
    }))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleProjectDelete = (id: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }

  const handleExperienceAdd = (exp: any) => {
    const newExp = { ...exp, id: Date.now() }
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleExperienceUpdate = (id: number, updatedExp: any) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...updatedExp } : exp)),
    }))
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleExperienceDelete = (id: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Panel de Administración</h1>
              <p className="text-sm text-muted-foreground">Bienvenido, {user?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={saveData}>
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                <Eye className="w-4 h-4 mr-2" />
                Ver Sitio
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="technologies" className="flex items-center space-x-2">
              <Code2 className="w-4 h-4" />
              <span>Tecnologías</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <FolderOpen className="w-4 h-4" />
              <span>Proyectos</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Experiencia</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={data.profile.name}
                      onChange={(e) => handleProfileUpdate("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Título Profesional</Label>
                    <Input
                      id="title"
                      value={data.profile.title}
                      onChange={(e) => handleProfileUpdate("title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.profile.email}
                      onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={data.profile.phone}
                      onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={data.profile.location}
                      onChange={(e) => handleProfileUpdate("location", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      value={data.profile.bio}
                      onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                      className="min-h-32"
                    />
                  </div>
                  <div>
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                      id="avatar"
                      value={data.profile.avatar}
                      onChange={(e) => handleProfileUpdate("avatar", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-lg">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Subir nueva imagen</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Technologies Tab */}
          <TabsContent value="technologies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Tecnologías</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Tecnología
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Editar Tecnología" : "Nueva Tecnología"}</DialogTitle>
                  </DialogHeader>
                  <TechnologyForm
                    technology={editingItem}
                    onSave={editingItem ? handleTechnologyUpdate : handleTechnologyAdd}
                    onCancel={() => {
                      setIsDialogOpen(false)
                      setEditingItem(null)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.technologies.map((tech) => (
                <Card key={tech.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{tech.name}</h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(tech)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleTechnologyDelete(tech.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    {tech.category}
                  </Badge>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nivel</span>
                      <span>{tech.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className={`h-2 rounded-full ${tech.color}`} style={{ width: `${tech.level}%` }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Proyectos</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Proyecto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Editar Proyecto" : "Nuevo Proyecto"}</DialogTitle>
                  </DialogHeader>
                  <ProjectForm
                    project={editingItem}
                    onSave={editingItem ? handleProjectUpdate : handleProjectAdd}
                    onCancel={() => {
                      setIsDialogOpen(false)
                      setEditingItem(null)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {data.projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <div className="flex space-x-2">
                        {project.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingItem(project)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleProjectDelete(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Experiencia</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingItem(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Experiencia
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Editar Experiencia" : "Nueva Experiencia"}</DialogTitle>
                  </DialogHeader>
                  <ExperienceForm
                    experience={editingItem}
                    onSave={editingItem ? handleExperienceUpdate : handleExperienceAdd}
                    onCancel={() => {
                      setIsDialogOpen(false)
                      setEditingItem(null)
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp) => (
                <Card key={exp.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{exp.position}</h3>
                        <Badge variant="outline">
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      <h4 className="text-primary font-medium mb-2">{exp.company}</h4>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(exp)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleExperienceDelete(exp.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

// Technology Form Component
function TechnologyForm({ technology, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: technology?.name || "",
    level: technology?.level || 50,
    category: technology?.category || "",
    color: technology?.color || "bg-blue-500",
  })

  const colorOptions = [
    { value: "bg-blue-500", label: "Azul" },
    { value: "bg-green-500", label: "Verde" },
    { value: "bg-red-500", label: "Rojo" },
    { value: "bg-yellow-500", label: "Amarillo" },
    { value: "bg-purple-500", label: "Morado" },
    { value: "bg-pink-500", label: "Rosa" },
    { value: "bg-indigo-500", label: "Índigo" },
    { value: "bg-gray-500", label: "Gris" },
  ]

  const categoryOptions = ["Frontend", "Backend", "Language", "Framework", "Database", "Cloud", "DevOps", "Mobile"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (technology) {
      onSave(technology.id, formData)
    } else {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="tech-name">Nombre</Label>
        <Input
          id="tech-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="tech-category">Categoría</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="tech-level">Nivel ({formData.level}%)</Label>
        <Input
          id="tech-level"
          type="range"
          min="0"
          max="100"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="tech-color">Color</Label>
        <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un color" />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${color.value}`} />
                  <span>{color.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          {technology ? "Actualizar" : "Agregar"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancelar
        </Button>
      </div>
    </form>
  )
}

// Project Form Component
function ProjectForm({ project, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    technologies: project?.technologies || [],
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
  })

  const [techInput, setTechInput] = useState("")

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t: string) => t !== tech),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (project) {
      onSave(project.id, formData)
    } else {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="project-title">Título</Label>
        <Input
          id="project-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="project-description">Descripción</Label>
        <Textarea
          id="project-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="project-image">URL de Imagen</Label>
        <Input
          id="project-image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="project-live">URL del Proyecto</Label>
        <Input
          id="project-live"
          value={formData.liveUrl}
          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="project-github">URL de GitHub</Label>
        <Input
          id="project-github"
          value={formData.githubUrl}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
        />
      </div>

      <div>
        <Label>Tecnologías</Label>
        <div className="flex space-x-2 mb-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Agregar tecnología"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => removeTechnology(tech)}>
              {tech} ×
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="project-featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <Label htmlFor="project-featured">Proyecto destacado</Label>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          {project ? "Actualizar" : "Agregar"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancelar
        </Button>
      </div>
    </form>
  )
}

// Experience Form Component
function ExperienceForm({ experience, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    company: experience?.company || "",
    position: experience?.position || "",
    period: experience?.period || "",
    description: experience?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (experience) {
      onSave(experience.id, formData)
    } else {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="exp-company">Empresa</Label>
        <Input
          id="exp-company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="exp-position">Posición</Label>
        <Input
          id="exp-position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="exp-period">Período</Label>
        <Input
          id="exp-period"
          value={formData.period}
          onChange={(e) => setFormData({ ...formData, period: e.target.value })}
          placeholder="ej: 2020 - 2022"
          required
        />
      </div>

      <div>
        <Label htmlFor="exp-description">Descripción</Label>
        <Textarea
          id="exp-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          {experience ? "Actualizar" : "Agregar"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancelar
        </Button>
      </div>
    </form>
  )
}
