import ButtonMain from "./ButtonMain";
import TextArea from "./TextArea";

export default function CommentAdd({buttonFunction, textArea}) {
  return (
    <div>
      <h2>Add comment</h2>
	  {textArea}
	  <ButtonMain text='ADD COMMENT' buttonFunction={buttonFunction} />
    </div>
  );
}
