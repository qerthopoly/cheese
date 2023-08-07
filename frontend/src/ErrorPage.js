import { useRouteError } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="App" id="error-page">
      <NavigationBar />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
