/**
 * Error message component
 * @param {string} message - Error message
 */
export default function ErrorMessage({ message }: { message: string }) {
  return <p className="mt-pr-8 text-14m text-s-danger">{message}</p>;
}
