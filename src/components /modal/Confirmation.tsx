export default function Confirmation({
  title, message, toggleModal,
}) {
  return toggleModal ? (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  ) : null;
}
