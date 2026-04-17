import Card from './ui/Card';

interface ErrorViewProps {
  message: string;
}

const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <Card className="border-rose-200 bg-rose-50/80">
      <h2 className="text-lg font-semibold text-rose-800">Analysis Error</h2>
      <p className="mt-2 text-sm text-rose-700">{message}</p>
    </Card>
  );
};

export default ErrorView;