function save(key, token) {
  localStorage.setItem(key, token);
}
function load(key) {
  return localStorage.getItem(key);
}
function remove(key) {
  localStorage.removeItem(key);
}

const sessionStorage = {
  save,
  remove,
  load
};

export default sessionStorage;
