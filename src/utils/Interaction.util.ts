import DateTime from 'src/libraries/DateTime';
import { Http } from 'src/libraries/Http';
import { ActionType } from 'src/models/UserInteraction.model';

export class InteractionUtils {
  static MIN_TIMEOUT_TIME = 5000;

  static async registerUserInteraction(id: number, type: ActionType) {
    console.info('Registrando interacción', id, type);
    const body = { id, type };
    const res = await Http.instance.post({
      url: `/interactions`,
      body,
      logged: false,
    });
    if (res.statusCode !== 200) {
      return console.log(res.message);
    }
    return res.data;
  }

  static async registerDailyLog() {
    //const body = { registerAt: DateTime.instance.serverDate(new Date()) };
    const body = { registerAt: new Date() };
    console.info('Registrando ingreso diario', body);
    const res = await Http.instance.post({
      url: `/interactions/daily-log`,
      body,
      logged: false,
    });
    if (res.statusCode !== 200) {
      return console.log(res.message);
    }
    return res.data;
  }
}
