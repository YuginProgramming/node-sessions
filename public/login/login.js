const form = document.querySelector('.form');


const auth = {
    status: null,
    id: null,
}

const setAuth = () => {
  const span = document.querySelector('.status');
  if ( auth.status === 'auth' ) {
    span.innerHTML = `auth id: ${auth.id}`
    return;
  }

  if ( auth.status === 'gues' ) {
    span.innerHTML = `gues`
    return;
  }

  span.innerHTML = `hz)`;
  
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { data } = await axios.post('/auth/login', formData);
    if ( data.status === 'ok' ) {
      auth.status = 'auth'
      auth.id = data.payload.user_id;
    }
    setAuth();
})

const setcheck = async () => {
  const { data } = await axios.get('/auth/status');
  if(data.payload.auth === 'guest') {
    auth.status = 'guest'
  } else if(data.payload.auth === 'auth') {
    auth.status = 'auth'
    auth.id = data.payload.user_id
  }
  setAuth();
  return;
} 

setcheck();
