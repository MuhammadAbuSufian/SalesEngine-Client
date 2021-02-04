export class UserSessionModel {
  constructor(model: any) {
    this.Id = model.Id;
    this.UserId = model.UserId;
    this.UserName = model.UserName;
    this.Name = model.Name;
    this.Email = model.Email;
    this.Phone = model.Phone;
    this.Address = model.Address;
    this.Role = model.Role;
    this.Token = model.Tokens[0].Ticket;
    this.Modified = model.Modified;
    this.LogedIn = model.LogedIn;
    this.Company = model.Company;
    this.CompanyName = model.Company.Name;
    this.BusinessType = model.Company.BusinessType;
    if(this.BusinessType == 0){
      this.Pharmacy = true;
    }
    if(this.BusinessType == 1){
      this.SuperShop = true;
    }

  }

  public Id: string;
  public UserId: string;
  public UserName: string;
  public Name: string;
  public Email: string;
  public Phone: string;
  public Address: string;
  public Role: any;
  public Token: string;
  public Modified: string;
  public LogedIn: Boolean;
  public Company: any;
  public CompanyName: string;
  public BusinessType: number;
  public Pharmacy: boolean;
  public SuperShop: boolean;

}
