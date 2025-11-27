// utils/authValidators.js
export function validatePassword(password = "") {
  const rules = [
    { id: "length", ok: password.length >= 8, text: "At least 8 characters" },
    { id: "lower", ok: /[a-z]/.test(password), text: "At least one lowercase letter" },
    { id: "upper", ok: /[A-Z]/.test(password), text: "At least one uppercase letter" },
    { id: "digit", ok: /\d/.test(password), text: "At least one digit" },
    { id: "special", ok: /[\W_]/.test(password), text: "At least one special character" },
  ];

  const ok = rules.every((r) => r.ok);
  return { ok, rules };
}
