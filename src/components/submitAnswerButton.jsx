// submitAnswerButton.jsx

const SubmitAnswerButton = ({ onSubmit }) => {
  return (
    <button className="submitButton" onClick={onSubmit}>
      Submit Answer
    </button>
  );
};

export default SubmitAnswerButton;
