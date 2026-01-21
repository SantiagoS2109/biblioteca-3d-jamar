-- Políticas RLS para Biblioteca 3D Jamar
-- Ejecutar en: https://supabase.com/dashboard/project/xadmunjbkvgnhlswupdv/sql

-- Habilitar RLS en las tablas
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Políticas para campaigns (permitir todo para usuarios autenticados)
CREATE POLICY "Enable all operations for authenticated users on campaigns" ON campaigns
FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para campaign_categories
CREATE POLICY "Enable all operations for authenticated users on campaign_categories" ON campaign_categories
FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para campaign_sections
CREATE POLICY "Enable all operations for authenticated users on campaign_sections" ON campaign_sections
FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para section_galleries
CREATE POLICY "Enable all operations for authenticated users on section_galleries" ON section_galleries
FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para gallery_images
CREATE POLICY "Enable all operations for authenticated users on gallery_images" ON gallery_images
FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para el bucket 'campanas' (storage)
-- Nota: Estas políticas se configuran en la sección Storage de Supabase
-- Ve a Storage > campanas > Policies y crea estas políticas:

-- Política para INSERT (subir archivos)
-- bucket_id: campanas
-- name: "Allow authenticated users to upload files"
-- definition: auth.role() = 'authenticated'

-- Política para SELECT (ver archivos)
-- bucket_id: campanas
-- name: "Allow authenticated users to view files"
-- definition: auth.role() = 'authenticated'

-- Si prefieres políticas más específicas por carpeta, puedes usar:
-- (bucket_id = 'campanas' AND auth.role() = 'authenticated' AND (storage.foldername(name))[1] = 'algun-folder')