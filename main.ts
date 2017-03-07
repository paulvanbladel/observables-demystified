import { Observable, Observer } from 'rxjs';

const output = document.getElementById('output');
const button = document.getElementById('button');

const click = Observable.fromEvent(button, 'click');


function load(url: string) {
  return Observable.create(observer => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      const data = JSON.parse(xhr.responseText);
      observer.next(data);
      observer.complete();
    });
    xhr.open('GET', url);
    xhr.send();
  });
}

function loadWithFetch(url: string) {
  return Observable.fromPromise(fetch(url).then((r) => {
    r.json();
  }))
}

function renderMovies(movies) {
  console.log('movies received by subscriber ' + JSON.stringify(movies));
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
}

click.flatMap(e => loadWithFetch('movies.json')).subscribe(
  renderMovies,
  e => console.log(e),
  () => console.log('complete')
);
