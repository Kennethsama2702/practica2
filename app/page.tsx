"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Code2,
  Database,
  Smartphone,
  Server,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Menu,
  X,
  ChevronRight,
  Star,
  Calendar,
  MapPin,
  Phone,
  Send,
  Eye,
  Settings,
} from "lucide-react"

const defaultData = {
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

export default function PortfolioHomepage() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [portfolioData, setPortfolioData] = useState(defaultData)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["inicio", "sobre-mi", "tecnologias", "proyectos", "experiencia", "contacto"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const loadPortfolioData = () => {
      try {
        const savedData = localStorage.getItem("portfolioData")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          setPortfolioData(parsedData)
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error)
        // Keep default data if there's an error
      }
    }

    loadPortfolioData()

    // Listen for storage changes (when admin updates data)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "portfolioData" && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue)
          setPortfolioData(newData)
        } catch (error) {
          console.error("Error parsing updated portfolio data:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-animation">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {portfolioData.profile.name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "sobre-mi", label: "Sobre Mí" },
              { id: "tecnologias", label: "Tecnologías" },
              { id: "proyectos", label: "Proyectos" },
              { id: "experiencia", label: "Experiencia" },
              { id: "contacto", label: "Contacto" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors hover:text-primary ${
                  activeSection === item.id ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Admin Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="group bg-transparent" asChild>
              <a href="/login">
                <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                Admin
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "sobre-mi", label: "Sobre Mí" },
                { id: "tecnologias", label: "Tecnologías" },
                { id: "proyectos", label: "Proyectos" },
                { id: "experiencia", label: "Experiencia" },
                { id: "contacto", label: "Contacto" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <a href="/login">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 float-animation" style={{ animationDelay: "0s" }}>
            <Code2 className="w-8 h-8 text-primary" />
          </div>
          <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: "2s" }}>
            <Database className="w-6 h-6 text-accent" />
          </div>
          <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: "4s" }}>
            <Server className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute bottom-20 right-10 float-animation" style={{ animationDelay: "1s" }}>
            <Smartphone className="w-7 h-7 text-accent" />
          </div>
        </div>

        <div className="container mx-auto px-6 text-center z-10">
          <div className="mb-8">
            <img
              src={portfolioData.profile.avatar || "/placeholder.svg"}
              alt={portfolioData.profile.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-2xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {portfolioData.profile.name}
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-primary font-medium mb-4">{portfolioData.profile.title}</p>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            {portfolioData.profile.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" onClick={() => scrollToSection("proyectos")} className="group">
              Ver Proyectos
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("contacto")}>
              Contactar
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="hover:text-primary">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-primary">
              <Mail className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Sobre Mí
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Desarrollador Apasionado por la Innovación
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Con más de 5 años de experiencia, me especializo en crear soluciones digitales que combinan
                funcionalidad excepcional con diseño elegante.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/developer-working-on-laptop.jpg"
                  alt="Desarrollador trabajando"
                  className="rounded-2xl shadow-2xl"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Perfil Profesional</h3>
                    <p className="text-muted-foreground">
                      Desarrollador full-stack con experiencia en arquitecturas modernas, metodologías ágiles y
                      liderazgo técnico.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Especialidades</h3>
                    <p className="text-muted-foreground">
                      React/Next.js, Node.js, TypeScript, arquitecturas cloud, optimización de rendimiento y experiencia
                      de usuario.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Formación Continua</h3>
                    <p className="text-muted-foreground">
                      Siempre aprendiendo nuevas tecnologías y mejores prácticas para mantenerme al día con las
                      tendencias del desarrollo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="tecnologias" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Tecnologías
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Stack Tecnológico</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Herramientas y tecnologías que domino para crear soluciones robustas y escalables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.technologies.map((tech, index) => (
              <Card
                key={tech.id || index}
                className="p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{tech.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {tech.category}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Nivel</span>
                    <span className="font-medium">{tech.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${tech.color} transition-all duration-1000 group-hover:scale-105`}
                      style={{ width: `${tech.level}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  {tech.level >= 90 && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  {tech.level >= 85 && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  {tech.level >= 80 && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Proyectos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Trabajos Destacados</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Una selección de proyectos que demuestran mis habilidades y experiencia en desarrollo web.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.featured && <Badge className="absolute top-4 left-4 bg-accent">Destacado</Badge>}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="ghost" size="sm" className="p-2" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Experiencia
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Trayectoria Profesional</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Mi evolución profesional a través de diferentes roles y responsabilidades.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              <div className="space-y-12">
                {portfolioData.experience.map((exp, index) => (
                  <div key={exp.id || index} className="relative flex items-start space-x-8">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <Briefcase className="w-8 h-8 text-primary-foreground" />
                    </div>

                    <Card className="flex-1 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-semibold">{exp.position}</h3>
                        <Badge variant="outline" className="w-fit">
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.period}
                        </Badge>
                      </div>
                      <h4 className="text-lg text-primary font-medium mb-3">{exp.company}</h4>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                Contacto
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Trabajemos Juntos</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">{portfolioData.profile.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">Teléfono</div>
                      <div className="text-muted-foreground">{portfolioData.profile.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Ubicación</div>
                      <div className="text-muted-foreground">{portfolioData.profile.location}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full md:w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar CV
                  </Button>
                </div>
              </div>

              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre</label>
                      <Input placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Asunto</label>
                    <Input placeholder="¿En qué puedo ayudarte?" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mensaje</label>
                    <Textarea placeholder="Cuéntame sobre tu proyecto..." className="min-h-32" />
                  </div>

                  <Button className="w-full group">
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Enviar Mensaje
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {portfolioData.profile.name}
              </span>
            </div>

            <div className="flex space-x-6">
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 {portfolioData.profile.name}. Desarrollado con Next.js y mucho ☕</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
