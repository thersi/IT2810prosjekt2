import React, { useState } from "react";

//Metoden tar inn url som github repoet
export default async function getEvents() {
  const request = new Request(
    "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11908/events",
    {
      method: "GET",
      headers: {
        "private-token": "Sct5JeQqxKoTAw1Smgyc",
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    }
  );

  const data = await fetch(request)
    .then((r) => r.json())
    .catch((error) => console.log(error));
  console.log(data[0]);

  return data;
}
