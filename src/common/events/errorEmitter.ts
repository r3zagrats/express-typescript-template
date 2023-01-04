/* eslint-disable class-methods-use-this */
import ErrorEventHandler from './handler/error-handler';

class EventEmitter {
  emit(event: string, data: any) {
    this.on(event, data);
  }

  on(event: string, data: any) {
    const eventHash = {
      error: (data: any) => ErrorEventHandler(data),
    };

    eventHash[event as keyof typeof eventHash](data);
  }
}

export default new EventEmitter();
