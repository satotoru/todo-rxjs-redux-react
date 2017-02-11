export function get(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const res = JSON.parse(localStorage.getItem(key));
    if (!res) {
      return reject();
    }
    resolve(res);
  });
}

export function set(key: string, data: any): Promise<{}> {
  return new Promise((resolve, reject) => {
    localStorage.setItem(key, JSON.stringify(data));
    resolve();
  });
}
