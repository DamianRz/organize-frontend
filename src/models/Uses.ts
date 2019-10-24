export default class Uses {

  private _idEvent: number;
  private _idQuestionnaire: number;
  private _idOption: number;

  constructor(idEvent: number, idQuestionnaire: number, idOption: number) {
    this._idEvent = idEvent;
    this._idQuestionnaire = idQuestionnaire;
    this._idOption = idOption;
  }

  get idEvent(): number { 
    return this._idEvent;
  }
  set idEvent(idEvent: number) { 
    this._idEvent = idEvent;
  }

  get idQuestionnaire(): number { 
    return this._idQuestionnaire;
  }
  set idQuestionnaire(idQuestionnaire: number) { 
    this._idQuestionnaire = idQuestionnaire;
  }
  
  get idOption(): number { 
    return this._idOption;
  }
  set idOption(idOption: number) { 
    this._idOption = idOption;
  }
}