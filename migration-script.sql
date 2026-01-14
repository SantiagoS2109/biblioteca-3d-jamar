-- SCRIPT DE MIGRACIÓN SEGURO (Conserva datos existentes)
-- Ejecuta esto en orden

-- PASO 1: Crear las nuevas tablas (sin eliminar las viejas)
CREATE TABLE IF NOT EXISTS campaign_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(campaign_id, slug)
);

-- PASO 2: Renombrar la tabla campaign_sections antigua a campaign_sections_old
ALTER TABLE campaign_sections RENAME TO campaign_sections_old;

-- PASO 3: Crear la nueva tabla campaign_sections (con category_id)
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

-- PASO 4: Crear las 3 categorías automáticamente para cada campaña
INSERT INTO campaign_categories (campaign_id, name, slug, description, "order")
SELECT DISTINCT c.id, 'Toolkit', 'toolkit', 'Toolkit de la campaña', 1
FROM campaigns c
ON CONFLICT DO NOTHING;

INSERT INTO campaign_categories (campaign_id, name, slug, description, "order")
SELECT DISTINCT c.id, 'Contenido de Producto', 'contenido-producto', 'Contenido de productos', 2
FROM campaigns c
ON CONFLICT DO NOTHING;

INSERT INTO campaign_categories (campaign_id, name, slug, description, "order")
SELECT DISTINCT c.id, 'Catálogo', 'catalogo', 'Catálogo de la colección', 3
FROM campaigns c
ON CONFLICT DO NOTHING;

-- PASO 5: Migrar datos de campaign_sections_old a campaign_sections
-- Asigna todas las secciones a la categoría "contenido-producto"
INSERT INTO campaign_sections (category_id, name, slug, color, icon_type, description, "order")
SELECT 
  cc.id as category_id,
  cso.name,
  cso.slug,
  cso.color,
  cso.icon_type,
  cso.description,
  cso."order"
FROM campaign_sections_old cso
JOIN campaigns c ON cso.campaign_id = c.id
JOIN campaign_categories cc ON cc.campaign_id = c.id AND cc.slug = 'contenido-producto'
ON CONFLICT DO NOTHING;

-- PASO 6: Crear las otras tablas necesarias
CREATE TABLE IF NOT EXISTS section_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES campaign_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(section_id, slug)
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID NOT NULL REFERENCES section_galleries(id) ON DELETE CASCADE,
  path_storage TEXT NOT NULL,
  title TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- PASO 7: Crear índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_campaigns_year ON campaigns(year);
CREATE INDEX IF NOT EXISTS idx_campaigns_slug ON campaigns(slug);
CREATE INDEX IF NOT EXISTS idx_categories_campaign ON campaign_categories(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sections_category ON campaign_sections(category_id);
CREATE INDEX IF NOT EXISTS idx_galleries_section ON section_galleries(section_id);
CREATE INDEX IF NOT EXISTS idx_images_gallery ON gallery_images(gallery_id);

-- PASO 8 (OPCIONAL): Ver los datos migrados
-- SELECT * FROM campaign_sections LIMIT 10;
-- SELECT * FROM campaign_categories LIMIT 10;

-- PASO 9 (OPCIONAL): Después de verificar que todo esté bien, puedes eliminar la tabla antigua
-- DROP TABLE campaign_sections_old;
