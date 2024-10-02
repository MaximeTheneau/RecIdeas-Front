export default function Select({ onChange, value, required }:any) {
  return (
    <select
      title="Sujet"
      name="subject"
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="Demande de renseignements">Demande de renseignements</option>
      <option value="Demande de devis">Demande de devis</option>
      <option value="Autre">Autre</option>
    </select>
  );
}
