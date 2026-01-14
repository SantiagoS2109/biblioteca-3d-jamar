# 📚 Guía de Estructura Dinámica de Campañas

## 🏗️ Arquitectura

### Estructura de Carpetas en Next.js

```
src/app/campanas/
├── [year]/
│   ├── page.js                              (lista de campañas del año)
│   ├── [campaignSlug]/
│   │   ├── page.js                          (detalle campaña + 3 categorías)
│   │   ├── [categorySlug]/
│   │   │   ├── page.js                      (secciones dentro de categoría)
│   │   │   └── [sectionSlug]/
│   │   │       └── page.js                  (galerías de la sección)
│   │   └── exhibicion-en-tiendas/          (DEPRECATED - Ruta antigua)
│   │       └── page.js
```

### Rutas Dinámicas

- `/campanas/2025` → Lista de campañas del 2025
- `/campanas/2025/ondara` → Campaña "Ondaría" con sus 3 categorías (Toolkit, Contenido, Catálogo)
- `/campanas/2025/ondara/toolkit` → Categoría "Toolkit" con sus secciones
- `/campanas/2025/ondara/toolkit/exhibicion-en-tiendas` → Sección con múltiples galerías

## 💾 Estructura en Supabase

### Tablas Relacionadas

1. **campaigns**

   - Almacena las campañas por año
   - Campos: id, name, year, slug, description, order

2. **campaign_sections**

   - Las 5-8 secciones dentro de cada campaña
   - Campos: id, campaign_id (FK), name, slug, color, icon_type, order

3. **section_galleries**

   - Las galerías dentro de cada sección
   - Campos: id, section_id (FK), name, slug, description, order

4. **gallery_images**
   - Las imágenes de cada galería
   - Campos: id, gallery_id (FK), path_storage, title, orden

### Relaciones

```
campaigns (1) ──────→ (N) campaign_sections
    ↓
campaign_sections (1) ──────→ (N) section_galleries
    ↓
section_galleries (1) ──────→ (N) gallery_images
```

## 🔗 Hooks Disponibles

### useFetchCampaigns(year)

```javascript
const { campaigns, loading, error } = useFetchCampaigns(2025);
// Retorna: [{ id, name, slug, year, description, order }, ...]
```

### useFetchCampaignDetails(year, campaignSlug)

```javascript
const { campaign, sections, loading, error } = useFetchCampaignDetails(
  2025,
  "ondara"
);
// Retorna: campaign + sections con todos sus datos
```

### useFetchSectionGalleries(year, campaignSlug, sectionSlug)

```javascript
const { section, galleries, loading, error } = useFetchSectionGalleries(
  2025,
  "ondara",
  "exhibicion-en-tiendas"
);
// Retorna: section + galleries de esa sección
```

### useFetchGalleryImages(galleryId)

```javascript
const { images, loading, error } = useFetchGalleryImages(galleryId);
// Retorna: [{ id, image (URL completa), title, orden }, ...]
```

## 📝 Cómo Agregar una Nueva Campaña

1. En Supabase, inserta en tabla `campaigns`:

```sql
INSERT INTO campaigns (name, year, slug, description, "order")
VALUES ('Mi Campaña', 2025, 'mi-campaña', 'Descripción', 1);
```

2. Inserta secciones en `campaign_sections`:

```sql
INSERT INTO campaign_sections (campaign_id, name, slug, color, icon_type, "order")
VALUES
  ((SELECT id FROM campaigns WHERE slug = 'mi-campaña'),
   'Mi Sección', 'mi-seccion', 'bg-blue-200', 'StorefrontIcon', 1);
```

3. Inserta galerías en `section_galleries`:

```sql
INSERT INTO section_galleries (section_id, name, slug, "order")
VALUES
  ((SELECT id FROM campaign_sections WHERE slug = 'mi-seccion'),
   'Galería 1', 'galeria-1', 1);
```

4. Inserta imágenes en `gallery_images`:

```sql
INSERT INTO gallery_images (gallery_id, path_storage, title, orden)
VALUES
  ((SELECT id FROM section_galleries WHERE slug = 'galeria-1'),
   'campañas/2025/mi-campaña/imagen1.jpg', 'Título', 1);
```

## 🎨 Iconos Disponibles

Los iconos se definen en el campo `icon_type` de `campaign_sections`:

- StorefrontIcon
- InfoIcon
- PaletteIcon
- CouchIcon
- ImagesIcon
- PanoramaIcon
- FileTextIcon
- VideoIcon

## ✅ Ventajas de Esta Estructura

✓ **Completamente dinámica** - Sin carpetas hardcodeadas
✓ **Escalable** - Agrega campañas, secciones y galerías sin modificar código
✓ **Flexible** - Personaliza colores, iconos y orden desde Supabase
✓ **Rápido** - Índices en BD para consultas optimizadas
✓ **Relacional** - Datos organizados de forma coherente
✓ **Mantenible** - Fácil agregar, editar o eliminar contenido

## 🚀 Próximos Pasos

1. Ejecuta `database-schema.sql` en Supabase SQL Editor
2. Ejecuta `example-data.sql` para datos de ejemplo
3. Habilita RLS (Row Level Security) si es necesario
4. Prueba las rutas: `/campanas/2025`, `/campanas/2025/ondara`, etc.
