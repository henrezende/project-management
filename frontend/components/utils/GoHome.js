import { useRouter } from "next/router";

const GoHome = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/`);
  };
  return (
    <div className="container mx-auto flex justify-end">
      <button
        type="button"
        onClick={() => handleClick()}
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2"
      >
        Voltar a home
      </button>
    </div>
  );
};

export default GoHome;
