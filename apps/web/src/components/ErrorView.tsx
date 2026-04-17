import { useI18n } from '../i18n/I18nProvider';
import Card from './ui/Card';

interface ErrorViewProps {
  message: string;
}

const ErrorView = ({ message }: ErrorViewProps) => {
  const { t } = useI18n();

  return (
    <Card className="border-rose-200 bg-rose-50/80">
      <h2 className="text-lg font-semibold text-rose-800">{t.error.title}</h2>
      <p className="mt-2 text-sm text-rose-700">{message}</p>
    </Card>
  );
};

export default ErrorView;