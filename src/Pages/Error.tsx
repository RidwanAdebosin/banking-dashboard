import { useRouteError, Link } from "react-router";
const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <p className="text-center">4040</p>
        <h1>page not found</h1>
        <p>{error.message}</p>
      </main>
    );
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center">there was an error</h4>
    </main>
  );
};

export default Error;
