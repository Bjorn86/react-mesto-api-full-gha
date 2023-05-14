// IMPORT COMPONENTS
import PopupWithForm from "./PopupWithForm";

// DELETE CARD POPUP COMPONENT
function DeleteCardPopup({
  isOpen,
  onClose,
  onDeleteCard,
  onLoading,
  card,
  onOverlayClick,
}) {
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }
  return (
    <PopupWithForm
      name="card-delete-confirmation"
      title="Вы&nbsp;уверены?"
      buttonText={onLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={true}
      onOverlayClick={onOverlayClick}
    />
  );
}

export default DeleteCardPopup;
