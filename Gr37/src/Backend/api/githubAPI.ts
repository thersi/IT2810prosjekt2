
//Metoden tar inn url som github repoet
function getGithub(url:string){
    console.log(url)
const request= 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/11908'+url;
const token = 'Sct5JeQqxKoTAw1Smgyc';
fetch(request, { method: 'GET',
 headers: { 'private-token': 'Sct5JeQqxKoTAw1Smgyc', 'content-type': 'application/json'}})
 .then(response => response.json())
 .then( data => console.log(data))
 .catch( error => console.error(error));

}

export function getAll(){
    getGithub('')
}
//Henter issues
export function getIssues(){
    getGithub('/issues');
    
}
export function getMembers(){
    getGithub('/members');
    
}
export function getMergeRequests(){
    getGithub('/merge_requests');
    
}
export function getEvents(){
    getGithub('/events');
    
}

export function getLabels(){
    getGithub('/label');
    
}

//Metode for 
