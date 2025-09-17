import api from "./axios";

// Tipos TypeScript
export interface Profile {
  id?: number;
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  github_url?: string;
  linkedin_url?: string;
  cv_url?: string;
}

export interface Technology {
  id?: number;
  name: string;
  level: number;
  category: string;
  color: string;
  order?: number;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  featured: boolean;
  order?: number;
}

export interface Experience {
  id?: number;
  company: string;
  position: string;
  period: string;
  description: string;
  order?: number;
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  read_at?: string;
  created_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface PortfolioData {
  profile: Profile;
  technologies: Technology[];
  projects: Project[];
  experience: Experience[];
}
// ========================================
// API Functions - Autenticación
// ========================================

export const authApi = {
  // Iniciar sesión
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  // Cerrar sesión
  logout: async (): Promise<void> => {
    await api.post("/logout");
  },

  // Obtener usuario actual
  me: async (): Promise<User> => {
    const response = await api.get("/me");
    return response.data.user;
  },
};

// ========================================
// API Functions - Portafolio Público
// ========================================

export const portfolioApi = {
  // Obtener todos los datos del portafolio (público)
  getAll: async (): Promise<PortfolioData> => {
    const response = await api.get("/portfolio");
    return response.data.data;
  },

  // Enviar mensaje de contacto (público)
  sendContact: async (
    contactData: Omit<Contact, "id" | "read" | "read_at" | "created_at">
  ): Promise<Contact> => {
    const response = await api.post("/contact", contactData);
    return response.data.data;
  },
};

// ========================================
// API Functions - Perfil
// ========================================

export const profileApi = {
  // Obtener perfil
  get: async (): Promise<Profile> => {
    const response = await api.get("/profile");
    return response.data.data;
  },

  // Actualizar perfil
  update: async (profileData: Partial<Profile>): Promise<Profile> => {
    const response = await api.put("/profile", profileData);
    return response.data.data;
  },
};

// ========================================
// API Functions - Tecnologías
// ========================================

export const technologiesApi = {
  // Listar todas las tecnologías
  getAll: async (): Promise<Technology[]> => {
    const response = await api.get("/technologies");
    return response.data.data;
  },

  // Obtener una tecnología
  get: async (id: number): Promise<Technology> => {
    const response = await api.get(`/technologies/${id}`);
    return response.data.data;
  },

  // Crear nueva tecnología
  create: async (
    technologyData: Omit<Technology, "id">
  ): Promise<Technology> => {
    const response = await api.post("/technologies", technologyData);
    return response.data.data;
  },

  // Actualizar tecnología
  update: async (
    id: number,
    technologyData: Partial<Technology>
  ): Promise<Technology> => {
    const response = await api.put(`/technologies/${id}`, technologyData);
    return response.data.data;
  },

  // Eliminar tecnología
  delete: async (id: number): Promise<void> => {
    await api.delete(`/technologies/${id}`);
  },
};

// ========================================
// API Functions - Proyectos
// ========================================

export const projectsApi = {
  // Listar todos los proyectos
  getAll: async (): Promise<Project[]> => {
    const response = await api.get("/projects");
    return response.data.data;
  },

  // Obtener un proyecto
  get: async (id: number): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data.data;
  },

  // Crear nuevo proyecto
  create: async (projectData: Omit<Project, "id">): Promise<Project> => {
    const response = await api.post("/projects", projectData);
    return response.data.data;
  },

  // Actualizar proyecto
  update: async (
    id: number,
    projectData: Partial<Project>
  ): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data.data;
  },

  // Eliminar proyecto
  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

// ========================================
// API Functions - Experiencias
// ========================================

export const experiencesApi = {
  // Listar todas las experiencias
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get("/experiences");
    return response.data.data;
  },

  // Obtener una experiencia
  get: async (id: number): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data.data;
  },

  // Crear nueva experiencia
  create: async (
    experienceData: Omit<Experience, "id">
  ): Promise<Experience> => {
    const response = await api.post("/experiences", experienceData);
    return response.data.data;
  },

  // Actualizar experiencia
  update: async (
    id: number,
    experienceData: Partial<Experience>
  ): Promise<Experience> => {
    const response = await api.put(`/experiences/${id}`, experienceData);
    return response.data.data;
  },

  // Eliminar experiencia
  delete: async (id: number): Promise<void> => {
    await api.delete(`/experiences/${id}`);
  },
};

// ========================================
// API Functions - Contactos (Admin)
// ========================================

export const contactsApi = {
  // Listar todos los mensajes de contacto
  getAll: async (): Promise<Contact[]> => {
    const response = await api.get("/contacts");
    return response.data.data;
  },

  // Obtener un mensaje de contacto
  get: async (id: number): Promise<Contact> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data.data;
  },

  // Marcar mensaje como leído
  markAsRead: async (id: number): Promise<Contact> => {
    const response = await api.patch(`/contacts/${id}/read`);
    return response.data.data;
  },

  // Eliminar mensaje
  delete: async (id: number): Promise<void> => {
    await api.delete(`/contacts/${id}`);
  },
};

// ========================================
// API Functions - Subida de Archivos
// ========================================

export const uploadApi = {
  // Subir imagen
  uploadImage: async (
    file: File,
    type: "avatar" | "project" | "cv"
  ): Promise<{ url: string; path: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    const response = await api.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      url: response.data.url,
      path: response.data.path,
    };
  },

  // Eliminar imagen
  deleteImage: async (path: string): Promise<void> => {
    await api.delete("/upload/image", { data: { path } });
  },
};
