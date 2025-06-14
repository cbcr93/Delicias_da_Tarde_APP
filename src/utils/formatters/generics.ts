export const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatDate = (date: Date | string, locale = 'pt-BR'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatCPF = (cpf: string): string => {
  const onlyNumbers = cpf.replace(/\D/g, '');
  return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    // (XX) XXXX-XXXX
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (digits.length === 11) {
    // (XX) 9XXXX-XXXX
    return digits.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  } else {
    return phone;
  }
};

export const formatCEP = (cep: string): string => {
  const digits = cep.replace(/\D/g, '');
  return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatRelativeDate = (date: Date | string): string => {
  const now = new Date();
  const d = typeof date === 'string' ? new Date(date) : date;

  const diffMs = now.getTime() - d.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'agora mesmo';
  } else if (diffMinutes < 60) {
    return `há ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays < 7) {
    return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
  } else {
    const dataFormatada =
      d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }) +
      ' ' +
      d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

    return dataFormatada;
  }
};

type TruncateOptions = {
  length: number;
  position?: 'start' | 'end';
};

export const formatTruncateString = (input: string, options: TruncateOptions): string => {
  const { length, position = 'end' } = options;

  if (input.length <= length) return input;

  switch (position) {
    case 'start':
      return input.slice(input.length - length);
    case 'end':
    default:
      return input.slice(0, length);
  }
};
