export class Moto {
  constructor(
    public id: string,
    public modele: string,
    public kilometrage: number,
    public dernierEntretien: Date,
    public intervalleKm: number,
    public intervalleTemps: number,
  ) {}
}
