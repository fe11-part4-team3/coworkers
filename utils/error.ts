interface StringError {
  (e: string): string;
}

interface InstanceError {
  (e: Error): string;
}

const errorCatch: StringError & InstanceError = (e: string | Error): string => {
  if (typeof e === 'string') {
    return e.toUpperCase();
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return 'Unknown error';
  }
};

export default errorCatch;
