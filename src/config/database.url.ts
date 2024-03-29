const getDatabaseUrl = (): string => {
  const dbName = process.env['DB_NAME'];
  const user = process.env['DB_USER'];
  const pass = process.env['DB_PASSWORD'];
  const url = process.env['DB_URL'];
  return 'mongodb+srv://' + user + ':' + pass + '@' + url + '/' + dbName + '?retryWrites=true&w=majority';
};

export default getDatabaseUrl;
