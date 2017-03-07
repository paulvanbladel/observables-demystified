import { Observable, Observer } from 'rxjs';

const numbers = [1, 5, 6];

const source = Observable.create(observer => {
 
  let index = 0;
  let produceValue = () => {
    observer.next(numbers[index++]);
    if(index < numbers.length){
      setTimeout(produceValue, 2000);
    }
    else{
      observer.complete();
    }
  }
  produceValue();

}).map(v => v * 2).filter(v => v > 4);


source.subscribe(
  (v) => console.log(v),
  e => console.log(e),
  () => console.log('complete'));
