export const findUser = async (username) => {
  const response = await fetch(`/api/summoners/${username}`);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response.json());
  }
}