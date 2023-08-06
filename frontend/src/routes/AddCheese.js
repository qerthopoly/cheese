import { useNavigate } from "react-router-dom";
import ButtonMain from "../components/ButtonMain";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import TextArea from "../components/TextArea";
import "../styles/Pages.css";
import useFetchPost from "../hooks/useFetchPost";
import useValidation from "../hooks/useValidation";

const validationRules = {
  name: "text",
  description: "text",
  picture: "text",
};

export default function AddCheese() {
  const cheesesURL = "http://localhost:9998/cheese";
  const navigate = useNavigate();

  function navigateToCheeses() {
    navigate("/home");
  }

  const { state, fetchPost } = useFetchPost(cheesesURL, navigateToCheeses);

  const {
    state: validationState,
    validate,
    setBodyField,
    isValid,
    getErrorMessage,
  } = useValidation(validationRules);


  return (
    <div className="wrapper">
      <NavigationBar buttonText="LOGIN" />
      <div className="middle-section">
        <h1 className="add-cheese-h1">Contribute please</h1>
        <h2 className="form-h2">Cheese name:</h2>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setBodyField("name", e.target.value)}
          onBlur={() => validate("name")}
          errorMessage={getErrorMessage("name")}
        />
        <h2 className="form-h2">Description:</h2>
        <TextArea
          placeholder="Description"
          onChange={(e) => setBodyField("description", e.target.value)}
          onBlur={() => validate("description")}
          errorMessage={getErrorMessage("description")}
        />
        <h2 className="form-h2">Picture URL:</h2>
        <Input
          type="text"
          placeholder="Picture"
          onChange={(e) => setBodyField("picture", e.target.value)}
          onBlur={() => validate("picture")}
          errorMessage={getErrorMessage("picture")}
        />
        <div className="submit-section">
          <ButtonMain
            text="ADD THE CHEESE"
            buttonFunction={() => fetchPost(validationState.body)}
            disabled={!isValid()}
          />
          <ButtonMain text="RETURN" buttonFunction={navigateToCheeses} />
        </div>
        {state.isLoading ? (
          <h3 className="post-loading-h3">Loading...</h3>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
