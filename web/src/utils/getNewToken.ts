export const getNewToken = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/auth/refresh_token', {
      method: 'post',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.accessToken) {
          const accessToken = data.accessToken;
          // setAccessToken(accessToken);
          return resolve(accessToken);
        } else {
          return resolve('');
        }
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return resolve('');
      });
  });
};
