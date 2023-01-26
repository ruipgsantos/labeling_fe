export default interface Case {
  _id: string;
  doctor_id: number;
  label: string;
  time: Date;
  text: string;
  labelled: boolean;
}
