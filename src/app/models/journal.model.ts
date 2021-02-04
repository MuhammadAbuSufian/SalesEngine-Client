import {JournalType} from './journal-type';
import {BaseModel} from './base.model';

export class Journal {
  Id;
  public  Amount;
  public  Note;
  public  Status;
  public  ApprovedBy;
  public JournalType: JournalType;
  Created;
  CreatedBy;
  JournalTypeId;
  SubmittedBy;

}
