export function log(message: string) {
  console.debug(message);
}

export function error(error: Error, shouldThrow = false) {
  console.error(`${error.name}: ${error.message}\n${error.stack}`);

  if (shouldThrow) {
    throw error;
  }
}
