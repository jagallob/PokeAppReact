import { useState } from "react";

function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [operacion, setOperacion] = useState("");

  const sumar = (a, b) => {
    return a + b;
  };

  const restar = (a, b) => {
    return a - b;
  };

  const multiplicar = (a, b) => {
    return a * b;
  };

  const dividir = (a, b) => {
    if (b === 0) {
      throw new Error("No se puede dividir por 0");
    }
    return a / b;
  };

  const calcular = (op) => {
    setError("");
    setOperacion(op);

    try {
      const a = parseInt(num1);
      const b = parseInt(num2);

      if (isNaN(a) || isNaN(b)) {
        setError("Por favor ingrese números válidos");
        return;
      }

      let result;
      switch (op) {
        case "sumar":
          result = sumar(a, b);
          break;
        case "restar":
          result = restar(a, b);
          break;
        case "multiplicar":
          result = multiplicar(a, b);
          break;
        case "dividir":
          try {
            result = dividir(a, b);
          } catch (e) {
            setError(e.message);
            return;
          }
          break;
        default:
          return;
      }
      setResultado(result);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Calculadora React</h1>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Primer número:</label>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Segundo número:</label>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() => calcular("sumar")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Sumar
        </button>
        <button
          onClick={() => calcular("restar")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Restar
        </button>
        <button
          onClick={() => calcular("multiplicar")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Multiplicar
        </button>
        <button
          onClick={() => calcular("dividir")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Dividir
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          <p className="text-red-500 font-bold">{error}</p>
        </div>
      )}

      {resultado !== null && !error && (
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="font-semibold">Resultado:</p>
          <p className="text-xl">
            {num1}{" "}
            {operacion === "sumar"
              ? "+"
              : operacion === "restar"
              ? "-"
              : operacion === "multiplicar"
              ? "x"
              : "÷"}{" "}
            {num2} = {resultado}
          </p>
        </div>
      )}
    </div>
  );
}

export default Calculadora;
