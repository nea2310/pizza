import makeRequest from './helpers/makeRequest';

function load(token: string) {
  let url = 'cart/load.php';

  if (token !== null) {
    url += `?token=${token}`;
  }

  return makeRequest(url);
}

function add(token: string, id: number) {
  return makeRequest(`cart/add.php?token=${token}&id=${id}`);
}

function remove(token: string, id: number) {
  return makeRequest(`cart/remove.php?token=${token}&id=${id}`);
}

function change(token: string, id: number, cnt: number) {
  return makeRequest(`cart/change.php?token=${token}&id=${id}&cnt=${cnt}`);
}


function clean(token: string) {
  return makeRequest(`cart/clean.php?token=${token}`);
}

export { load, add, remove, change, clean };