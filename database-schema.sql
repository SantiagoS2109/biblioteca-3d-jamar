-- Tabla de campañas
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  path_portada TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(year, slug)
);

-- Tabla de categorías de campaña (Toolkit, Contenido de Producto, Catálogo)
CREATE TABLE campaign_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(campaign_id, slug)
);

-- Tabla de secciones (dentro de categorías)
CREATE TABLE campaign_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES campaign_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  color TEXT,
  icon_type TEXT,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- Tabla de galerías de sección
CREATE TABLE section_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES campaign_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(section_id, slug)
);

-- Tabla de imágenes de galería
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES section_galleries(id) ON DELETE CASCADE,
  path_storage TEXT NOT NULL,
  title TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_campaigns_year ON campaigns(year);
CREATE INDEX idx_campaigns_slug ON campaigns(slug);
CREATE INDEX idx_categories_campaign ON campaign_categories(campaign_id);
CREATE INDEX idx_sections_category ON campaign_sections(category_id);
CREATE INDEX idx_galleries_section ON section_galleries(section_id);
CREATE INDEX idx_images_gallery ON gallery_images(gallery_id);
