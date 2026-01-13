-- Ejemplo de datos para Supabase

-- Insertar campaña
INSERT INTO campaigns (name, year, slug, description, "order")
VALUES 
  ('Ondaría', 2025, 'ondara', 'Colección Ondaría 2025', 1),
  ('Rústico', 2025, 'rustico', 'Colección Rústico 2025', 2);

-- Insertar secciones para la campaña Ondaría
INSERT INTO campaign_sections (campaign_id, name, slug, color, icon_type, description, "order")
VALUES 
  (
    (SELECT id FROM campaigns WHERE slug = 'ondara'),
    'Exhibición en Tiendas',
    'exhibicion-en-tiendas',
    'bg-amber-200',
    'StorefrontIcon',
    'Imágenes de exhibición en puntos de venta',
    1
  ),
  (
    (SELECT id FROM campaigns WHERE slug = 'ondara'),
    'Información de Producto',
    'info-producto',
    'bg-blue-200',
    'InfoIcon',
    'Fichas técnicas y detalles de producto',
    2
  ),
  (
    (SELECT id FROM campaigns WHERE slug = 'ondara'),
    'Moodboard',
    'moodboard',
    'bg-red-200',
    'PaletteIcon',
    'Paleta de colores de la colección',
    3
  );

-- Insertar galerías para la sección "Exhibición en Tiendas"
INSERT INTO section_galleries (section_id, name, slug, description, "order")
VALUES 
  (
    (SELECT id FROM campaign_sections WHERE slug = 'exhibicion-en-tiendas' LIMIT 1),
    'Tienda Centro Comercial',
    'tienda-centro-1',
    'Fotos de la exhibición en el Centro Comercial',
    1
  ),
  (
    (SELECT id FROM campaign_sections WHERE slug = 'exhibicion-en-tiendas' LIMIT 1),
    'Tienda Premium',
    'tienda-premium-1',
    'Fotos de la exhibición en tienda Premium',
    2
  );

-- Insertar imágenes para la galería
INSERT INTO gallery_images (gallery_id, path_storage, title, orden)
VALUES 
  (
    (SELECT id FROM section_galleries WHERE slug = 'tienda-centro-1' LIMIT 1),
    'campañas/2025/ondara/exhibicion/img1.jpg',
    'Vista general del stand',
    1
  ),
  (
    (SELECT id FROM section_galleries WHERE slug = 'tienda-centro-1' LIMIT 1),
    'campañas/2025/ondara/exhibicion/img2.jpg',
    'Detalle de productos',
    2
  );
