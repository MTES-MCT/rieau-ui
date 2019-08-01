function env(nom) {
  return process.env.NODE_ENV === 'production'
    ? window.env[nom]
    : process.env[nom];
}

export { env };
