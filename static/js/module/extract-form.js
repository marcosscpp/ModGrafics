export default function extractFormData(form) {
  const formData = new FormData(form);
  const jsonFormData = {};
  for (const [key, value] of formData) {
    jsonFormData[key] = value;
  }
  return jsonFormData;
}
