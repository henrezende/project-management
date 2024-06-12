import { useState } from "react";
import { useRouter } from "next/router";
import { login, register } from "../../services/authService";
import { setAuthToken } from "@/utils/auth";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const goToRegisterPage = () => {
    router.push("/auth/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const data = await login(email, password);
        setAuthToken(data);
      } else {
        const data = await register(name, email, password);
        setAuthToken(data);
      }
      router.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        {mode === "login" ? "Login" : "Cadastrar"}
      </h2>
      {mode === "register" ? (
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
            required
          />
        </div>
      ) : null}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600"
      >
        {mode === "login" ? "Login" : "Cadastrar"}
      </button>

      {mode === "login" ? (
        <button
          type="button"
          className="w-full py-2 px-4 text-red-400 rounded-md shadow-sm mt-8 hover:bg-gray-200"
          onClick={() => goToRegisterPage()}
        >
          Ainda não é cadastrado? Cadastre-se!
        </button>
      ) : null}
    </form>
  );
}
