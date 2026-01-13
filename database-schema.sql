-- Tabla de campañas
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(year, slug)
);

-- Tabla de secciones de campaña
CREATE TABLE campaign_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  color TEXT,
  icon_type TEXT,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(campaign_id, slug)
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
CREATE INDEX idx_sections_campaign ON campaign_sections(campaign_id);
CREATE INDEX idx_galleries_section ON section_galleries(section_id);
CREATE INDEX idx_images_gallery ON gallery_images(gallery_id);
