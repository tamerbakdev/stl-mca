import { Subject } from 'rxjs/Subject';

/**
 * @constructs AppState
 * @desc This class implements Singleton pattern in order to save app state consistency
*/
export class AppState {
  private static _initialized = false;
  private static _instance: AppState = null;

  public static get instance() {
    console.log('AppState get instance', AppState._initialized);

    if (AppState._initialized) {
      return AppState._instance;
    } else {
      throw new Error('AppState isn\'t initialized');
    }
  }

  public static init() {
    if (AppState._initialized) {
      throw new Error('App must have single state and cannot be reinitialized!');
    }

    AppState._instance = new AppState();
    AppState._initialized = true;

    console.log('AppState.init called', AppState._initialized);

    return AppState._instance;
  }

  private _loading$: Subject<boolean>;

  public get loading$() {
    return this._loading$.asObservable();
  }

  constructor() {
    this._loading$ = new Subject();
  }

  public toggleLoading(state: boolean) {
    this._loading$.next(state);
  }
}
