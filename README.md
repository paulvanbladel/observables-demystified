# observables-demystified


## subscribing to an observable source via a dedicated observer class
```
import {Observable, Observer} from 'rxjs';

const numbers = [1,5,6];

const source = Observable.from(numbers);

class MyObserver implements Observer<number>{
  next(value){
    console.log(value);
  }
  error(e){
    console.log(e);
  }
  complete(){
    console.log('complete');
  }
}

source.subscribe(new MyObserver());
```

## subscribing to an observable source via individual lamdba expressions for next, error and complete
```
import { Observable, Observer } from 'rxjs';

const numbers = [1, 5, 6];

const source = Observable.from(numbers);

source.subscribe(
  (v) => console.log(v),
  e => console.log(e),
  () => console.log('complete'));
```

## creating an observable via Observable.create()

```
import { Observable, Observer } from 'rxjs';

const numbers = [1, 5, 6];

const source = Observable.create(observer => {
  for (const n of numbers) {
    observer.next(n);
  }
  observer.complete();
});


source.subscribe(
  (v) => console.log(v),
  e => console.log(e),
  () => console.log('complete'));
```

## creating an observable via Observable.create() and raising an exception inside the observable
```
import { Observable, Observer } from 'rxjs';

const numbers = [1, 5, 6];

const source = Observable.create(observer => {
  for (const n of numbers) {
    if (n === 5) {
      observer.error('serious problem here which will stop the observer');
    }
    observer.next(n);
  }
  observer.complete();
});


source.subscribe(
  (v) => console.log(v),
  e => console.log(e),
  () => console.log('complete'));
``` 
## creating an observable via Observable.create() which delays the emition of values (in a manual fashing)
```
import { Observable, Observer } from 'rxjs';

const numbers = [1, 5, 6];

const source = Observable.create(observer => {
 
  let index = 0;
  let produceValue = ()=>{
    observer.next(numbers[index++]);
    if(index< numbers.length){
      setTimeout(produceValue,2000);
    }
    else{
      observer.complete();
    }
  }
  produceValue();

});


source.subscribe(
  (v) => console.log(v),
  e => console.log(e),
  () => console.log('complete'));
```

## Mapping and filtering an observable
```
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
```


