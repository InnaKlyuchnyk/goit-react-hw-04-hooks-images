const API_KEY = "24436915-6043b65348ea2ff9e087fc098";

export const APIfetchImg = ({ query = "", page = 1 } = {}) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};
