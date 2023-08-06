import { useNavigate, useParams } from "react-router-dom";
import ButtonMain from "../components/ButtonMain";
import Input from "../components/Input";
import NavigationBar from "../components/NavigationBar";
import TextArea from "../components/TextArea";
import "../styles/Pages.css";
import useFetchPost from "../hooks/useFetchPost";
import useValidation from "../hooks/useValidation";
import useFetchGet from "../hooks/useFetchGet";
import { useEffect } from "react";

const validationRules = {
  name: "text",
  description: "text",
  picture: "text",
};

export default function CheeseUpdate() {
  const { id } = useParams();
//   const cheesesURL = "http://localhost:9998/cheese";
  const navigate = useNavigate();

  const cheeseURL = `http://localhost:9998/cheese/${id}`;

  const { state: cheeseState } = useFetchGet(cheeseURL);

  const { state, fetchPost } = useFetchPost(
    cheeseURL,
    () => navigate(`/cheese/${id}`),
    true
  );

  const {
    state: validationState,
    validate,
    setBodyField,
    isValid,
    getErrorMessage,
  } = useValidation(validationRules);

  useEffect(() => {
    setBodyField("name", cheeseState.data.name);
	setBodyField("description", cheeseState.data.description);
	setBodyField("picture", cheeseState.data.picture);
	validate('name')
	validate('description')
	validate('picture')
  }, [cheeseState]);

  return (
    <div className="wrapper">
      <NavigationBar buttonText="LOGIN" />
      <div className="middle-section">
        <h1 className="add-cheese-h1">Update cheese</h1>
        <h2 className="form-h2">Cheese name:</h2>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setBodyField("name", e.target.value)}
          onBlur={() => validate("name")}
          errorMessage={getErrorMessage("name")}
          initialValue={validationState.body.name}
        />
        <h2 className="form-h2">Description:</h2>
        <TextArea
          placeholder="Description"
          onChange={(e) => setBodyField("description", e.target.value)}
          onBlur={() => validate("description")}
          errorMessage={getErrorMessage("description")}
          initialValue={validationState.body.description}
        />
        <h2 className="form-h2">Picture URL:</h2>
        <Input
          type="text"
          placeholder="Picture"
          onChange={(e) => setBodyField("picture", e.target.value)}
          onBlur={() => validate("picture")}
          errorMessage={getErrorMessage("picture")}
          initialValue={validationState.body.picture}
        />
        <div className="submit-section">
          <ButtonMain
            text="UPDATE CHEESE"
            buttonFunction={() => fetchPost(validationState.body)}
            disabled={!isValid()}
          />
          <ButtonMain
            text="RETURN"
            buttonFunction={() => navigate(`/cheese/${id}`)}
          />
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
