interface ErrorViewProps {
  message: string;
}

const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <section className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-rose-800">Error del análisis</h2>
      <p className="mt-2 text-sm text-rose-700">{message}</p>
    </section>
  );
};

export default ErrorView;