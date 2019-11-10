function env(name) {
  return process.env.NODE_ENV === 'production'
    ? window.env[name]
    : process.env[name];
}

export { env };
