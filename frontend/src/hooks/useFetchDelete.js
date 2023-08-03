export function useFetchDelete(URL, fetchData) {
  const jwtToken = sessionStorage.getItem("jwtToken");

  function fetchDelete(id) {
    fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error) {
          return console.log(data.error);
        } else {
          fetchData();
        }
      });
  }

  return fetchDelete;
}
