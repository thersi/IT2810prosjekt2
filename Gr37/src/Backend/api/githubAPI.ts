import React, { useState } from "react";

//Metoden tar inn url som github repoet
export default function gevents() {
  var arrayEvents = new Array();
  const request =
    "https://gitlab.stud.idi.ntnu.no/api/v4/projects/11908/events";
  const token = "Sct5JeQqxKoTAw1Smgyc";
  const events = fetch(request, {
    method: "GET",
    headers: {
      "private-token": "Sct5JeQqxKoTAw1Smgyc",
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        arrayEvents.push(data[i]);
      }
    })

    .catch((error) => console.error(error));

  return arrayEvents;
}

/* 
export function getAll(){
    getGithub('')
}
//Henter issues
export function getIssues(){
    console.log(Promise.resolve(getGithub('/issues')));
    
}
export function getMembers(){
    getGithub('/members');
    
}
export function getMergeRequests(){
    getGithub('/merge_requests');
    
}
export function getEvents(){
     getGithub('/events').
     
}

export function getLabels(){
    getGithub('/label');
    
}

//Metode for 
 */
