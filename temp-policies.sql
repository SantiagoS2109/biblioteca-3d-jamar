-- POLÍTICAS TEMPORALES PARA TESTING (PERMISIVAS)
-- ⚠️  SOLO PARA DESARROLLO - CAMBIAR EN PRODUCCIÓN ⚠️

-- Políticas públicas para testing (permitir todo)
CREATE POLICY "Allow all operations on campaigns" ON campaigns FOR ALL USING (true);
CREATE POLICY "Allow all operations on campaign_categories" ON campaign_categories FOR ALL USING (true);
CREATE POLICY "Allow all operations on campaign_sections" ON campaign_sections FOR ALL USING (true);
CREATE POLICY "Allow all operations on section_galleries" ON section_galleries FOR ALL USING (true);
CREATE POLICY "Allow all operations on gallery_images" ON gallery_images FOR ALL USING (true);

-- Para el bucket 'campanas', ve a Storage > Policies y configura:
-- INSERT: true (permitir subir archivos)
-- SELECT: true (permitir ver archivos)