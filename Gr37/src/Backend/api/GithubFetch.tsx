const BASE_URL = "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11908/";

/*
In a production environment, or some application that is to be deployed, including a
key in such a manner is a very bad practice. Instead, it should be stored externally,
either by passing the request through some back-end service or by using a framework
such as NextJS to store the values in a .env file.
*/
const TOKEN = "Sct5JeQqxKoTAw1Smgyc";

//Metoden tar inn url som github repoet
export default async function getEvents() {
  const request = new Request(BASE_URL + "events?per_page=500&action=pushed", {
    method: "GET",
    headers: {
      "private-token": TOKEN,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  const data = await fetch(request)
    .then((r) => r.json())
    .catch((error) => console.log(error));
  console.log(data);

  return data;
}

export async function getMerge() {
  const request = new Request(BASE_URL + "merge_requests?per_page=500", {
    method: "GET",
    headers: {
      "private-token": TOKEN,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  const data = await fetch(request)
    .then((r) => r.json())
    .catch((error) => console.log(error));
  console.log(data);
  return data;
}
