let response = null;

export function setResponse(res) {
  response = res;
}

export function fetchFundraisers() {
  return new Promise((resolve, reject) => {
    process.nextTick(() => response instanceof Error ? reject(response) : resolve(response));
  });
}
