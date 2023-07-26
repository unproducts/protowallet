export class TimelessDate {
  y: number = 0;
  m: number = 0;
  d: number = 0;

  constructor(d: Date) {
    this.y = d.getFullYear();
    this.m = d.getMonth();
    this.d = d.getDate();
  }

  toString(): string {
    return `${this.y}-${this.m+1}-${this.d}`;
  }

  toDate(): Date {
    return new Date(this.toString());
  }
}
