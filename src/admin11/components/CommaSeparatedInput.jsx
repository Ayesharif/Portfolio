import { useState } from "react";

/**
 * A text input for editing a comma-separated list (e.g. "React.js, Node.js").
 *
 * Why this exists:
 * The old code derived the input's `value` by joining the array on every
 * render (`arr.join(", ")`) and re-parsed it on every keystroke by
 * splitting on "," and filtering out empty strings. That meant the instant
 * you typed a "," the trailing empty segment was filtered out and the
 * displayed value snapped back to the version WITHOUT the comma you just
 * typed — so it looked like you couldn't type a comma at all.
 *
 * The fix: keep the raw text the user is typing in local state. Only the
 * parsed array is sent up to the parent (via onChange), the array is never
 * fed back into the visible text while the user is editing. Pass a `key`
 * prop from the parent (e.g. keyed on the item's id) so this component
 * resets to the item's saved value whenever a *different* item is opened.
 */
export default function CommaSeparatedInput({
  initialValue,
  onChange,
  placeholder,
  className
}) {
  const [text, setText] = useState(
    Array.isArray(initialValue) ? initialValue.join(", ") : initialValue || ""
  );

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onChange(
      newText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      className={className}
    />
  );
}
