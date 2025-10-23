function NavButtonsBiblioteca({ piso, setPiso }) {
  return (
    <div className="grid grid-cols-3 w-full gap-4 mb-18 lg:w-1/2">
      <Button onClick={() => setPiso(1)} isActive={piso === 1}>
        Piso 1
      </Button>
      <Button onClick={() => setPiso(2)} isActive={piso === 2}>
        Piso 2
      </Button>
      <Button onClick={() => setPiso(3)} isActive={piso === 3}>
        Piso 3
      </Button>
    </div>
  );
}

export default NavButtonsBiblioteca;

function Button({ onClick, isActive, children }) {
  return (
    <button
      onClick={onClick}
      className={`btn-primario text-red-jamar ${
        isActive ? "text-white bg-red-jamar " : ""
      }`}
    >
      {children}
    </button>
  );
}
