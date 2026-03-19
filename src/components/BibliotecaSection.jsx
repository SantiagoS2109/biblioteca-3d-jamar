"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchModelos } from "../hooks/useFetchModelos";
import { useFetchSearchModelos } from "../hooks/useFetchSearchModelos";
import CardModelo from "./CardModelo";
import Spinner from "./UI/Spinner";
import Link from "next/link";
import { BookmarkIcon, CubeIcon } from "@phosphor-icons/react/dist/ssr";

export const pisos = [
  {
    id: 1,
    label: "Piso 1",
    descripcion: "Modelos social, dormitorio, sofás, comedores y más.",
  },
  {
    id: 2,
    label: "Piso 2",
    descripcion: "Mesas de centro, butacas, paneles, puff, reclinables.",
  },
  {
    id: 3,
    label: "Piso 3",
    descripcion: "Cocina, baño, iluminación y complementos.",
  },
];

const linkBiblioteca =
  "https://organizacionjamar-my.sharepoint.com/:x:/g/personal/msoto_jamar_com/IQDaoVA_w7DIRJiasyBxQGP7AaNzPvQ0kompuh7wPAlcg00?rtime=5LkwF0o63kg";

const linkTangibles =
  "https://organizacionjamar-my.sharepoint.com/:x:/r/personal/ssepulveda_jamar_com/_layouts/15/doc2.aspx?sourcedoc=%7B107E9695-ACF4-40C0-9C54-0DDF7079CF53%7D&file=MODELOS%203D%20-%20TANGIBLES%20PRIMERA%20TANTA%20(1)%20-%20Copia.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1&wdOrigin=WAC.EXCEL.HOME-BUTTON%2CAPPHOME-WEB.FILEBROWSER.RECENT&wdPreviousSession=f57ca8a5-2b97-8a65-3561-83af6b8402a5&wdPreviousSessionSrc=Wac&ct=1766926527153";

function BibliotecaSection() {
  const searchParams = useSearchParams();

  const [pisoActivo, setPisoActivo] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [piso3View, setPiso3View] = useState("modelo");
  const [contenedor, setContenedor] = useState("3866");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // Sincronizar el estado con la URL
  useEffect(() => {
    const pisoFromUrl = searchParams.get("piso");
    const piso3ViewFromUrl = searchParams.get("view");
    const categoriaFromUrl = searchParams.get("categoria");

    if (pisoFromUrl) {
      setPisoActivo(parseInt(pisoFromUrl, 10));
    }
    if (piso3ViewFromUrl) {
      setPiso3View(piso3ViewFromUrl);
    }
    if (categoriaFromUrl) {
      setFiltroCategoria(categoriaFromUrl);
    }
  }, [searchParams]);

  // Actualizar la URL cuando cambia el piso (sin recargar la página)
  const handlePisoChange = (newPiso) => {
    setPisoActivo(newPiso);
    setFiltroCategoria("");
    window.history.pushState(null, "", `?piso=${newPiso}`);
  };

  // Actualizar la URL cuando cambia la vista del piso 3 (sin recargar la página)
  const handlePiso3ViewChange = (newView) => {
    setPiso3View(newView);
    window.history.pushState(null, "", `?piso=3&view=${newView}`);
  };

  const { modelos, loading } = useFetchModelos(pisoActivo, piso3View);
  const { modelos: modelosBusqueda, loading: loadingBusqueda } =
    useFetchSearchModelos(pisoActivo, searchTerm, piso3View);

  const contenedorCodigos = Array.from(
    new Set(modelos.map((m) => m.contenedor).filter(Boolean)),
  );

  // Si hay búsqueda activa, usar los resultados de Supabase
  let modelosFiltrados = [];
  let loadingActual = loading;

  if (searchTerm.trim()) {
    // Cuando hay búsqueda, filtrar los resultados por piso3View y contenedor si es necesario
    modelosFiltrados = modelosBusqueda
      .filter((m) => (pisoActivo !== 3 ? true : m.tipo === piso3View))
      .filter((m) => {
        if (pisoActivo !== 3) return true;
        if (piso3View === "contenedor") {
          if (!contenedor) return true;
          return m.contenedor === contenedor;
        }
        return true;
      })
      .filter((m) => {
        if (!filtroCategoria) return true;
        return m.categoria === filtroCategoria;
      });
    loadingActual = loadingBusqueda;
  } else {
    // Si no hay búsqueda, mostrar todos los modelos con los filtros normales
    modelosFiltrados = modelos
      .filter((m) => (pisoActivo !== 3 ? true : m.tipo === piso3View))
      .filter((m) => {
        if (pisoActivo !== 3) return true;
        if (piso3View === "contenedor") {
          if (!contenedor) return true;
          return m.contenedor === contenedor;
        }
        return true;
      })
      .filter((m) => {
        if (!filtroCategoria) return true;
        return m.categoria === filtroCategoria;
      });
  }

  const categoriasDisponibles = Array.from(
    new Set(modelos.map((m) => m.categoria).filter(Boolean)),
  );

  const handleCategoriaChange = (categoria) => {
    setFiltroCategoria(categoria);
    window.history.pushState(
      null,
      "",
      `?piso=${pisoActivo}&categoria=${categoria}`,
    );
  };

  const limpiarFiltroCategoria = () => {
    setFiltroCategoria("");
    window.history.pushState(null, "", `?piso=${pisoActivo}`);
  };

  const colorPaleta = [
    "#ffc078", // Naranja/Rojo
    "#74c0fc", // Azul
    "#8ce99a", // Verde
    "#ffe066", // Amarillo
    "#ffa8a8", // Rojo
    "#b197fc", // Púrpura
    "#66d9e8", // Cian
  ];

  const getCategoryColor = (categoria, allCategories) => {
    const index = allCategories.indexOf(categoria);
    return colorPaleta[index % colorPaleta.length];
  };

  return (
    <section id="biblioteca" className="w-full flex gap-8 py-8 px-4 lg:px-32">
      {/* SIDEBAR - Acceso Rápido */}
      <aside className="w-64 flex-shrink-0">
        <div className="sticky top-12 bg-gray-50 rounded-lg p-6 shadow-sm h-[calc(100vh-5rem)] flex flex-col">
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            Acceso Rápido
          </h3>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2">
              {/* Selección de Piso */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-600 mb-3">Pisos</p>
                <div className="flex flex-col gap-2">
                  {pisos.map((piso) => (
                    <SidebarItem
                      key={piso.id}
                      dot={pisoActivo === piso.id ? "#E8401C" : "#B4B2A9"}
                      label={`Piso ${piso.id}`}
                      active={pisoActivo === piso.id}
                      onClick={() => handlePisoChange(piso.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Filtros para Piso 3 */}
              {pisoActivo === 3 && (
                <>
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-600 mb-3">
                      Vista
                    </p>
                    <div className="flex flex-col gap-2">
                      <SidebarItem
                        label="Modelos"
                        active={piso3View === "modelo"}
                        dot={piso3View === "modelo" ? "#E8401C" : "#B4B2A9"}
                        onClick={() => handlePiso3ViewChange("modelo")}
                      />

                      <SidebarItem
                        label="Contenedores"
                        active={piso3View === "contenedor"}
                        dot={piso3View === "contenedor" ? "#E8401C" : "#B4B2A9"}
                        onClick={() => handlePiso3ViewChange("contenedor")}
                      />
                    </div>
                  </div>

                  {/* Filtro de Contenedores */}
                  {piso3View === "contenedor" && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        Contenedores
                      </p>
                      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                        {contenedorCodigos.map((codigo) => (
                          <SidebarItem
                            key={codigo}
                            label={codigo}
                            dot={contenedor === codigo ? "#E8401C" : "#B4B2A9"}
                            active={contenedor === codigo}
                            onClick={() => setContenedor(codigo)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Selección de Categorias */}
              {pisoActivo !== 3 && (
                <div className="mb-8">
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    Categorías
                  </p>
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-96">
                    {categoriasDisponibles.map((categoria) => (
                      <SidebarItem
                        key={categoria}
                        label={categoria}
                        dot={getCategoryColor(categoria, categoriasDisponibles)}
                        active={searchTerm === categoria}
                        onClick={() => handleCategoriaChange(categoria)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 mt-auto">
            <Link
              className="flex items-center py-2 px-4 rounded-full transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-sm"
              href={linkBiblioteca}
              rel="noopener noreferrer"
              target="_blank"
            >
              <BookmarkIcon size={18} className="inline mr-2" />
              Biblioteca Excel
            </Link>

            <Link
              className="flex items-center py-2 px-4 rounded-full transition-all duration-300 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-sm"
              href={linkTangibles}
              rel="noopener noreferrer"
              target="_blank"
            >
              <CubeIcon size={18} className="inline mr-2" />
              Tangible Excel
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN - Contenido Principal */}
      <main className="flex-1">
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Biblioteca</h2>
            <p className="text-gray-600">
              {pisos.find((p) => p.id === pisoActivo)?.descripcion}
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="mb-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por nombre o código..."
                className="border-2 border-gray-300 p-4 rounded-lg w-full transition-all duration-300 outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-red-jamar/65"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              {searchTerm && (
                <button
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 cursor-pointer font-bold text-lg"
                  onClick={() => setSearchTerm("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
              {modelosFiltrados.length} modelo
              {modelosFiltrados.length !== 1 ? "s" : ""} encontrado
              {modelosFiltrados.length !== 1 ? "s" : ""}
            </div>
            {filtroCategoria && (
              <div className="bg-orange-100 text-orange-700 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <span>{filtroCategoria}</span>
                <button
                  onClick={limpiarFiltroCategoria}
                  className="hover:text-orange-900 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Grid de modelos */}
          {loadingActual ? (
            <div className="flex items-center justify-center w-full py-24">
              <Spinner />
            </div>
          ) : (
            <div>
              {modelosFiltrados.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
                  {modelosFiltrados.map((modelo) => (
                    <CardModelo
                      key={modelo.id}
                      modelo={modelo}
                      piso={pisoActivo}
                    />
                  ))}
                </div>
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">
                    {searchTerm
                      ? "No se encontraron coincidencias"
                      : "No hay modelos disponibles en este piso"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </section>
  );
}

export default BibliotecaSection;

function SidebarItem({ icon, dot, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[13px] transition-colors duration-150 text-left ${
        active
          ? "bg-orange-50 text-[#E8401C] font-medium"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      {dot && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: dot }}
        />
      )}
      {icon && <span className="shrink-0 text-current">{icon}</span>}
      <span className="flex-1 truncate">{label}</span>
    </button>
  );
}
