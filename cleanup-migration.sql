-- SCRIPT PARA ELIMINAR LA TABLA ANTIGUA DE FORMA SEGURA
-- Ejecuta esto DESPUÉS del migration-script.sql

-- PASO 1: Migrar datos de section_galleries que apuntan a campaign_sections_old
-- Actualizar las referencias para apuntar a las nuevas secciones
UPDATE section_galleries sg
SET section_id = cs.id
FROM campaign_sections_old cso
JOIN campaign_sections cs ON cs.name = cso.name AND cs.slug = cso.slug
WHERE sg.section_id = cso.id;

-- PASO 2: Ahora SÍ se puede eliminar la tabla antigua
DROP TABLE campaign_sections_old CASCADE;

-- PASO 3: Verificar que todo se migró correctamente
SELECT 
  COUNT(*) as total_galerías,
  COUNT(DISTINCT cs.id) as secciones_referenciadas
FROM section_galleries sg
JOIN campaign_sections cs ON sg.section_id = cs.id;

-- PASO 4: Verificar estructura final
SELECT 
  c.name as campaña,
  cc.name as categoría,
  cs.name as sección,
  COUNT(sg.id) as cantidad_galerías
FROM campaign_sections cs
JOIN campaign_categories cc ON cs.category_id = cc.id
JOIN campaigns c ON cc.campaign_id = c.id
LEFT JOIN section_galleries sg ON sg.section_id = cs.id
GROUP BY c.name, cc.name, cs.name
ORDER BY c.name, cc."order", cs."order";
