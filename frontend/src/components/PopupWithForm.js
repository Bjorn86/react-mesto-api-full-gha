// IMPORT COMPONENTS
import Form from "./Form";
import Popup from "./Popup";

// POPUP WITH FORM COMPONENT
function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
  ...props
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      type="form"
    >
      <h2 className="popup__title">{title}</h2>
      <Form
        name={name}
        buttonText={buttonText}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
      >
        {props.children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
